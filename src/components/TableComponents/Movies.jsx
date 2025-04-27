import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { movies } from '../../Data/TableData';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

const Movies = () => {
  const [rowSelection, setRowSelection] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);

  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllRowsSelected() || 
            (table.getIsSomeRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'director',
      header: 'Director',
    },
    {
      accessorKey: 'genre',
      header: 'Genre',
    },
  ];

  const table = useReactTable({
    data: movies,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const getSelectedMovies = () => {
    return table.getFilteredSelectedRowModel().rows.map(row => row.original);
  };

  const handleShowSelected = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto mt-10">
        <CardContent className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Movies List</h2>
            <Button 
              onClick={handleShowSelected} 
              disabled={table.getFilteredSelectedRowModel().rows.length === 0}
            >
              Show Selected ({table.getFilteredSelectedRowModel().rows.length})
            </Button>
          </div>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader className="top-0 bg-white z-10">
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <TableHead key={header.id}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map(row => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Selected Movies</DialogTitle>
          </DialogHeader>
          {getSelectedMovies().length > 0 ? (
            <div className="space-y-4 h-[350px] overflow-scroll">
              {getSelectedMovies().map((movie, index) => (
                <div key={index} className="border rounded p-3">
                  <p className="font-medium">{movie.title}</p>
                  <p className="text-sm text-gray-500">Director: {movie.director}</p>
                  <p className="text-sm text-gray-500">Genre: {movie.genre}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No movies selected</p>
          )}
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Movies;