"use client";

import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/web/components/ui/chart";

export const description =
  "A simple pie chart to demonstrate availability and downtime";

const chartConfig = {
  stats: {
    label: "Stats",
  },
  down: {
    label: "Down",
    color: "var(--chart-1)",
  },
  availabily: {
    label: "Availabily",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartPie({ data }: { data: any }) {
  return (
    <div className="flex flex-col justify-center">
      <div className="text-center">Availability Status</div>
      <div className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={data} dataKey="stats" nameKey="browser" />
          </PieChart>
        </ChartContainer>
      </div>
      <div className="flex gap-4">
        {data.map((stat: any) => (
          <div key={stat.browser} className="flex justify-center gap-1">
            <div className="h-7 w-7" style={{ background: stat.fill }} />
            <span>{stat.browser}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
