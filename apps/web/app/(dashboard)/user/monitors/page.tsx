import { api } from "@repo/web/config/http-request";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import Link from "next/link";

const page = async () => {
  const token = await getCookie("token", { cookies });
  const websites = await api.get("/website", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return (
    <div className="flex flex-col gap-8">
      {websites.data.data.map((website: any) => (
        <div key={website.id}>
          <Link href={`/user/monitors/${website.id}`}>See details </Link>
          <h2>{website.title}</h2>
          <p>{website.url}</p>
          <p>Status: {website.status}</p>
          <p>Response Time: {website.responseTimeMs} ms</p>
        </div>
      ))}
    </div>
  );
};

export default page;
