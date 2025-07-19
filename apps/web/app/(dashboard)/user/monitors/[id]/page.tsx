import { Badge } from "@repo/web/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/web/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/web/components/ui/table";
import { api } from "@repo/web/config/http-request";
import { getCookie } from "cookies-next/server";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  TrendingUp,
} from "lucide-react";
import { cookies } from "next/headers";
import Charts from "./Charts";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const token = await getCookie("token", { cookies });
  const website = await api.get(`/website/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { website: data, availability, downtime } = website.data.data;

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString();
  };

  const getStatusBadge = (status: string) => {
    return status === "UP" ? (
      <Badge
        variant="default"
        className="bg-green-100 text-green-800 hover:bg-green-100"
      >
        <CheckCircle className="w-3 h-3 mr-1" />
        UP
      </Badge>
    ) : (
      <Badge variant="destructive">
        <AlertTriangle className="w-3 h-3 mr-1" />
        DOWN
      </Badge>
    );
  };

  return (
    <div className="flex flex-col gap-8 my-10">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Checks</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.ticks.length}</div>
            <p className="text-xs text-muted-foreground">Across all regions</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {availability.percentage.toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {availability.count} up, {downtime.count} down
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Response Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{333}ms</div>
            <p className="text-xs text-muted-foreground">
              {/* Last {totalChecks} checks */}
              Last 5 checks
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Regions</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Global monitoring (USA, India)
            </p>
          </CardContent>
        </Card>
      </div>

      <Charts data={data} availability={availability} downtime={downtime} />

      <Card>
        <CardHeader>
          <CardTitle>Monitoring Log</CardTitle>
          <CardDescription>
            Detailed view of all monitoring checks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Response Time</TableHead>
                <TableHead>Check ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.ticks.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.checkedAt.split("T")[0]}
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatTime(item.checkedAt)}
                  </TableCell>
                  <TableCell>{item.region.name}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`font-mono ${
                        item.responseTimeMs > 1000
                          ? "text-orange-600"
                          : item.responseTimeMs > 500
                            ? "text-yellow-600"
                            : "text-green-600"
                      }`}
                    >
                      {item.responseTimeMs}ms
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {item.id.slice(-8)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
