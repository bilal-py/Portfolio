'use client';

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"; // Make sure path casing matches your project
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { MoreHorizontal, Plus } from "lucide-react";
import { Input } from "@/Components/ui/input";

type RowData = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function EditableTable() {
  const [data, setData] = React.useState<RowData[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
  ]);

  const [editingCell, setEditingCell] = React.useState<{ id: number; field: keyof RowData } | null>(null);
  const [editValue, setEditValue] = React.useState("");

  const handleCellClick = (id: number, field: keyof RowData, value: string) => {
    setEditingCell({ id, field });
    setEditValue(value);
  };

  const handleInputBlur = () => {
    if (editingCell) {
      setData((prev) =>
        prev.map((row) =>
          row.id === editingCell.id ? { ...row, [editingCell.field]: editValue } : row
        )
      );
      setEditingCell(null);
    }
  };

  const handleAddRow = () => {
    const newRow: RowData = { id: Date.now(), name: "", email: "", role: "" };
    setData((prev) => [...prev, newRow]);
    setEditingCell({ id: newRow.id, field: "name" });
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Editable Table</h2>
        <Button onClick={handleAddRow} variant="outline">
          <Plus className="h-4 w-4 mr-2" /> Add Row
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {(["name", "email", "role"] as (keyof RowData)[]).map((field) => {
                const value = row[field] as string; // ✅ fix TS error safely

                return (
                  <TableCell
                    key={field}
                    onClick={() => handleCellClick(row.id, field, value)}
                    className="cursor-pointer"
                  >
                    {editingCell?.id === row.id && editingCell.field === field ? (
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleInputBlur}
                        autoFocus
                      />
                    ) : (
                      value || <span className="text-muted-foreground">Click to edit</span>
                    )}
                  </TableCell>
                );
              })}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleDelete(row.id)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
