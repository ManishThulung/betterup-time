import { api } from "@repo/web/config/http-request";
import { getCookie } from "cookies-next/server";
import { cookies } from "next/headers";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const token = await getCookie("token", { cookies });
  const website = await api.get(`/website/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = website.data.data;
  return (
    <div className="flex flex-col gap-8">
      {data && (
        <div key={data.id} className="flex flex-col gap-8">
          <div className="flex gap-10">
            <p>{data.id}</p>
            <h2>{data.title}</h2>
            <p>{data.url}</p>
          </div>
          <div className="flex flex-col gap-4">
            {data.ticks &&
              data.ticks.length > 0 &&
              data.ticks.map((tick: any) => (
                <div key={tick.id}>
                  <p>Status: {tick.status}</p>
                  <p>Response Time: {tick.responseTimeMs} ms</p>
                  <p>
                    Last Checked: {new Date(tick.lastChecked).toLocaleString()}
                  </p>
                  <p>Regions Monitored: {tick.region.name}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
