import Sidebar from "@repo/web/components/sidebar";
import { api } from "@repo/web/config/http-request";
import { getCookie } from "cookies-next/server";
import { Monitor, ReplyIcon } from "lucide-react";
import { cookies } from "next/headers";

const sidebarItems = [
  { title: "Monitors", path: "/user/monitors", icon: <Monitor /> },
  { title: "Reports", path: "/user/reports", icon: <ReplyIcon /> },
];

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getCookie("token", { cookies });
  const user = await api.get("/my-detail", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <div className="flex h-screen w-screen ">
      <Sidebar
        items={sidebarItems}
        username={user.data.data.name}
        email={user.data.data.email}
      />
      <div className="overflow-auto flex-1 p-6">{children}</div>
    </div>
  );
}
