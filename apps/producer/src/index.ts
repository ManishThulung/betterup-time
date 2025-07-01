import { prismaClient } from "@repo/db/prismaClient";
import { createClient } from "redis";

async function main() {
  const client = await createClient()
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

  try {
    const websites = await prismaClient.website.findMany({
      include: {
        user: { select: { name: true, email: true } },
      },
    });
    websites.forEach(async (website) => {
      const res = await client.xAdd("betteruptime:website", "*", {
        url: website.url,
        id: website.id,
        userName: website.user.name,
        userEmail: website.user.email,
      });
      console.log(res, "res");
      client.destroy();
    });
    console.log(websites, "wesites");
  } catch (error) {
    console.log(error, "error while pushing website to worker queue");
    throw new Error("error while pushing website to worker queue");
  }
}

main();
