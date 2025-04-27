import React, { useState } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fruits } from "../../Data/TableData";

const Fruits = () => {
    const [pageIndex, setPageIndex] = useState(0); 
    const itemsPerPage = 5;

    const columns = [
        {
            header: "Name",
            accessorKey: "name",
        },
        {
            header: "Color",
            accessorKey: "color",
        },
        {
            header: "Calories",
            accessorKey: "calories",
        },
        {
            header: "Origin",
            accessorKey: "origin",
        },
    ];

    const table = useReactTable({
        data: fruits,
        columns,
        state: {
            pagination: {
                pageIndex,
                pageSize: itemsPerPage,
            },
        },
        onPaginationChange: (updater) => {
            if (typeof updater === 'function') {
              const newState = updater({
                pageIndex,
                pageSize: itemsPerPage
              });
              setPageIndex(newState.pageIndex);
            } else {
              setPageIndex(updater.pageIndex);
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const pageCount = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex;

    const renderPaginationItems = () => {
        const items = [];
        
        items.push(
            <PaginationItem key="first">
                <PaginationLink
                    isActive={currentPage === 0}
                    onClick={() => table.setPageIndex(0)}
                    className="cursor-pointer"
                >
                    1
                </PaginationLink>
            </PaginationItem>
        );

        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(pageCount - 1, currentPage + 1);
        
        if (startPage > 1) {
            items.push(
                <PaginationItem key="ellipsis-start">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }
        
        for (let i = startPage; i <= endPage; i++) {
            if (i === 0 || i === pageCount - 1) continue;
            
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        isActive={currentPage === i}
                        onClick={() => table.setPageIndex(i)}
                        className="cursor-pointer"
                    >
                        {i + 1}
                    </PaginationLink>
                </PaginationItem>
            );
        }
        
        if (endPage < pageCount - 2) {
            items.push(
                <PaginationItem key="ellipsis-end">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }
        
        if (pageCount > 1) {
            items.push(
                <PaginationItem key="last">
                    <PaginationLink
                        isActive={currentPage === pageCount - 1}
                        onClick={() => table.setPageIndex(pageCount - 1)}
                        className="cursor-pointer"
                    >
                        {pageCount}
                    </PaginationLink>
                </PaginationItem>
            );
        }
        
        return items;
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Fruits List</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {table.getFlatHeaders().map(header => (
                                <TableHead key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination className="mt-4">
                    <PaginationContent className="flex justify-between w-full">
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => table.previousPage()}
                                className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                        
                        <div className="flex items-center">
                            {pageCount > 1 && renderPaginationItems()}
                        </div>

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => table.nextPage()}
                                className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </CardContent>
        </Card>
    );
};

export default Fruits;