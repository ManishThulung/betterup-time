"use client";

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
import Link from "next/link";

function WebsiteTable({ websites }: { websites: any }) {
  if (!websites) {
    return <div>No data found!</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monitoring Websites</CardTitle>
        <CardDescription>
          Detailed list of all monitoring websites
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Url</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Region</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {websites.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-[#0416D2]">
                  <Link href={`/user/monitors/${item.id}`} className="flex">
                    {item.title}
                  </Link>
                </TableCell>

                <TableCell>
                  <Link
                    key={item.id}
                    href={`/user/monitors/${item.id}`}
                    className="flex"
                  >
                    {item.url}
                  </Link>
                </TableCell>

                <TableCell className="font-medium">
                  {item.createdAt.split("T")[0]}
                </TableCell>
                <TableCell>
                  <span className={`font-mono `}>USA, India</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default WebsiteTable;
