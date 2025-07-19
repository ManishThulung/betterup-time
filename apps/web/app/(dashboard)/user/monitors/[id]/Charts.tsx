"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/web/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/web/components/ui/chart";
import {
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  responseTime: {
    label: "Response Time",
    color: "hsl(var(--primary))",
  },
};

const Charts = async ({
  data,
  availability,
  downtime,
}: {
  data: any;
  availability: any;
  downtime: any;
}) => {
  // Prepare chart data
  const responseTimeData = data.ticks.map((item: any, index: number) => ({
    time: `Check ${index + 1}`,
    responseTime: item.responseTimeMs,
    status: item.status,
  }));

  const statusData = [
    { name: "UP", value: availability.count, color: "hsl(var(--success))" },
    { name: "DOWN", value: downtime.count, color: "hsl(var(--destructive))" },
  ];
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Response Time Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Response Time Trends</CardTitle>
          <CardDescription>Performance across recent checks</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTimeData}>
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="responseTime"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Status Distribution</CardTitle>
          <CardDescription>UP vs DOWN status overview</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value, percent }) =>
                    `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Charts;
