import { prismaClient } from "@repo/db/prismaClient";
import axios from "axios";
import { createClient } from "redis";

const REGION = process.env.REGION || "cmcrwa36n0000kixrvj58x1vf"; //default india us -> cmcrwacwf0001kixr6r6jnkfv
const WORKER = process.env.WORKER || "cmcrwa36n0000kixrvj58x1vf-1";
const STREAM_KEY = "betteruptime:website";

type RedisMessageType = {
  id: string;
  message: {
    url: string;
    id: string;
    userName: string;
    userEmail: string;
  };
};

async function main() {
  const client = await createClient()
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

  while (true) {
    try {
      const response = await client.xReadGroup(
        REGION, // consumer group
        WORKER, // consumer/worker server
        {
          key: STREAM_KEY, // redis key
          id: ">",
        },
        {
          COUNT: 2,
          BLOCK: 5000, // wait for 5 seconds if no new messages
        }
      );
      console.log(JSON.stringify(response), "response");
      // @ts-ignore
      const websites: RedisMessageType[] = response?.[0]?.messages;

      if (!websites) {
        console.log("No new messages in the stream");
        continue; // No new messages, continue to the next iteration
      }

      console.log(websites, "websites");

      const promises = websites.map(async (website) =>
        fetchWebsite(website.message.url, website.message.id)
      );
      await Promise.all(promises);

      // Acknowledge the message after processing
      const eventIds = websites.map((website) => website.id);
      for (const eventId of eventIds) {
        await client.xAck(STREAM_KEY, REGION, eventId);
      }
    } catch (error) {
      console.log(error, "error while pushing website to worker queue");
      throw new Error("error while pushing website to worker queue");
    }
  }
}

async function fetchWebsite(url: string, websiteId: string) {
  const initTime = Date.now();
  try {
    await axios.get(url);
    const responseTime = Date.now() - initTime;
    await prismaClient.websiteTick.create({
      data: {
        websiteId,
        status: "UP",
        regionId: REGION,
        responseTimeMs: responseTime,
      },
    });
  } catch {
    const responseTime = Date.now() - initTime;
    await prismaClient.websiteTick.create({
      data: {
        websiteId,
        status: "DOWN",
        regionId: REGION,
        responseTimeMs: responseTime,
      },
    });
  }
}

main();
