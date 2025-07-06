import { prismaClient } from "@repo/db/prismaClient";
import { createClient } from "redis";

const STREAM_KEY = "betteruptime:website";

async function main() {
  const client = await createClient()
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

  try {
    console.log(new Date(), "Pushing websites to worker queue");
    const websites = await prismaClient.website.findMany({
      select: {
        id: true,
        url: true,
        user: { select: { name: true, email: true } },
      },
    });
    for (const website of websites) {
      await client.xAdd(STREAM_KEY, "*", {
        url: website.url,
        id: website.id,
        userName: website.user.name,
        userEmail: website.user.email,
      });
    }
  } catch (error) {
    console.log(error, "error while pushing website to worker queue");
    throw new Error("error while pushing website to worker queue");
  }
}

main();

setInterval(
  () => {
    main();
  },
  3 * 60 * 1000
); // every 3 minutes
