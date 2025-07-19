import { api } from "@repo/web/config/http-request";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import WebsiteTable from "./table";
import { WebsiteDialog } from "@repo/web/components/dialog/website-dialog";

const page = async () => {
  const token = await getCookie("token", { cookies });
  const websites = await api.get("/website", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return (
    <div className="">
      <div className="flex justify-between mb-8">
        <h1>Your websites</h1>

        <WebsiteDialog token={token as string} />
      </div>
      <WebsiteTable websites={websites.data.data} />
    </div>
  );
};

export default page;
