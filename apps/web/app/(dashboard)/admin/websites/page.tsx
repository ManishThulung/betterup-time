import { api } from "@repo/web/config/http-request";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";

const page = async () => {
  const token = await getCookie("token", { cookies });
  const res = await api.get("/admin/website", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return <div>{JSON.stringify(res.data.data)}</div>;
};

export default page;
