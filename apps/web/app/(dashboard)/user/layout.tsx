import Sidebar from "@repo/web/components/sidebar";

const sidebarItems = [
  { title: "monitors", path: "/user/monitors" },
  { title: "reports", path: "/user/reports" },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen ">
      <Sidebar items={sidebarItems} />
      <div className="overflow-auto flex-1 p-6">{children}</div>
    </div>
  );
}
