import React, { useState } from "react";
import { 
  useReactTable, 
  getCoreRowModel, 
  flexRender
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  DropdownMenu, 
  DropdownMenuCheckboxItem, 
  DropdownMenuContent, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { food } from "../../Data/TableData";

export default function Food() {
    const columns = [
        {
          accessorKey: "id",
          header: "ID",
        },
        {
          accessorKey: "name",
          header: "Name",
        },
        {
          accessorKey: "type",
          header: "Cuisine Type",
        },
        {
          accessorKey: "calories",
          header: "Calories",
        },
        {
          accessorKey: "price",
          header: "Price (USD)",
        },
        {
          accessorKey: "isVegetarian",
          header: "Vegetarian",
        },
      ];
      
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnPinning, setColumnPinning] = useState({});

  const table = useReactTable({
    data: food,
    columns,
    state: {
      columnVisibility,
      columnPinning,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,
    getCoreRowModel: getCoreRowModel(),
  });
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Food Information</CardTitle>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Column Options
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  Pin "Name" Column
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setColumnPinning({ left: ['name'] })}>
                    Pin to Left
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setColumnPinning({ right: ['name'] })}>
                    Pin to Right
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setColumnPinning({ left: [], right: [] })}>
                    Reset Pinning
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  Visibility
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {table.getAllColumns()
                    .filter(column => column.getCanHide())
                    .map(column => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => column.toggleVisibility(!!value)}
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="relative w-full overflow-auto">
          <Table className="w-full">
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    const isPinnedLeft = header.column.getIsPinned() === 'left';
                    const isPinnedRight = header.column.getIsPinned() === 'right';
                    
                    return (
                      <TableHead 
                        key={header.id}
                        style={{
                          position: isPinnedLeft || isPinnedRight ? 'sticky' : '',
                          left: isPinnedLeft ? 0 : 'auto',
                          right: isPinnedRight ? 0 : 'auto',
                          zIndex: isPinnedLeft || isPinnedRight ? 20 : 10,
                          backgroundColor: 'white',
                          boxShadow: isPinnedLeft ? '2px 0 5px rgba(0,0,0,0.1)' : 
                                    isPinnedRight ? '-2px 0 5px rgba(0,0,0,0.1)' : 'none'
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map(cell => {
                      const isPinnedLeft = cell.column.getIsPinned() === 'left';
                      const isPinnedRight = cell.column.getIsPinned() === 'right';
                      
                      return (
                        <TableCell 
                          key={cell.id}
                          style={{
                            position: isPinnedLeft || isPinnedRight ? 'sticky' : '',
                            left: isPinnedLeft ? 0 : 'auto',
                            right: isPinnedRight ? 0 : 'auto',
                            zIndex: isPinnedLeft || isPinnedRight ? 10 : 0,
                            backgroundColor: 'white',
                            boxShadow: isPinnedLeft ? '2px 0 5px rgba(0,0,0,0.1)' : 
                                      isPinnedRight ? '-2px 0 5px rgba(0,0,0,0.1)' : 'none'
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}