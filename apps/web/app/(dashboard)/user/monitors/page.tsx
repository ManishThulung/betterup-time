import { api } from "@repo/web/config/http-request";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import WebsiteTable from "./table";
import { WebsiteDialog } from "@repo/web/components/dialog/website-dialog";
import { Separator } from "@repo/web/components/ui/separator";

const page = async () => {
  const token = await getCookie("token", { cookies });
  const websites = await api.get("/website", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return (
    <>
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl text-[#0416D2] font-semibold">
          Your Monitoring websites
        </h1>
        <WebsiteDialog token={token as string} />
      </div>
      <Separator />
      <div className="mt-8">
        <WebsiteTable websites={websites.data.data} />
      </div>
    </>
  );
};

export default page;
