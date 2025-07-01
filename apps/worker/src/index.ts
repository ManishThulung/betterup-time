import { createClient } from "redis";

async function main() {
  const client = await createClient()
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

  try {
    const response = await client.xReadGroup(
      "india", // consumer group
      "server-1", // consumer server
      {
        key: "betteruptime:website", // redis key
        id: ">",
      },
      {
        COUNT: 2,
      }
    );
    console.log(JSON.stringify(response), "response");
    client.destroy();
  } catch (error) {
    console.log(error, "error while pushing website to worker queue");
    throw new Error("error while pushing website to worker queue");
  }
}

main();
