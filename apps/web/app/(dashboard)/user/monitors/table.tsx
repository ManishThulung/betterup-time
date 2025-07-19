"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/web/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

function WebsiteTable({ websites }: { websites: any }) {
  const tableColumns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: () => <span>Name</span>,
      cell: ({ row }) => {
        const name = row.original.title || "...";
        return (
          <Link
            href={`/user/monitors/${row.original.id}`}
            className="line-clamp-1 w-full cursor-pointer truncate text-xs font-normal text-[#0416D2] md:text-sm md:font-medium"
          >
            {name.length > 28 ? `${name.substring(0, 26)}...` : name}
          </Link>
        );
      },
    },
    {
      accessorKey: "url",
      header: () => <span>Url</span>,
      cell: ({ row }) => row.original.url || "...",
    },
    {
      accessorKey: "createdAt",
      header: () => <span>Created At</span>,
      cell: ({ row }) => <span>{row.original.createdAt.split("T")[0]}</span>,
    },
    // {
    //   id: "actions",
    //   enableHiding: false,
    //   enableSorting: false,
    //   header: "Action",
    //   cell: ({ row }) => (
    //     <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border p-1 hover:shadow-md">
    //       <ChevronRight className="h-6 w-6" />
    //     </div>
    //   ),
    // },
  ];

  const table = useReactTable({
    data: websites ?? [],
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!websites) {
    return <div>No data found!</div>;
  }
  return (
    <div>
      <Table>
        <TableHeader className="sticky top-0 hidden md:table-header-group">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-[#E6E6E6]">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer select-none px-6 py-3"
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <>
                            {header.column.getIsSorted() === "asc" && (
                              <ChevronUp className="h-4 w-4" />
                            )}
                            {header.column.getIsSorted() === "desc" && (
                              <ChevronDown className="h-4 w-4" />
                            )}
                            {header.column.getIsSorted() === false && (
                              <ChevronUp className="h-4 w-4 opacity-20" /> // show faded icon by default
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        {table.getRowModel().rows.length ? (
          <TableBody>
            {table.getRowModel().rows.map((row, rowIndex, allRows) => {
              const isLast = rowIndex === allRows.length - 1;
              const isEven = rowIndex % 2 === 0;
              return (
                <TableRow
                  key={row.id}
                  className={`hidden transition-colors duration-200 hover:bg-gradient-to-t hover:from-[#283b75]/10 hover:to-[#173697]/10 md:table-row ${
                    isEven ? "bg-white" : "bg-[#fafafa]"
                  }`}
                >
                  {row.getVisibleCells().map((cell, cellIndex, allCells) => {
                    const isFirstCell = cellIndex === 0; // First column
                    const isLastCell = cellIndex === allCells.length - 1;

                    const roundedClass = isLast
                      ? `${isFirstCell ? "rounded-bl-lg" : ""} ${isLastCell ? "rounded-br-lg" : ""}`
                      : "";

                    return (
                      <TableCell
                        key={cell.id}
                        className={` ${isFirstCell ? "px-5" : ""} ${roundedClass}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="py-10 text-center text-gray-500"
              >
                No results.
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </div>
  );
}

export default WebsiteTable;
