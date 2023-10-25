"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Issue = {
  id: string;
  title: string;
  description: string;
  status: "closed" | "open" | "in_progress";
  createdAt: Date;
};

export const columns: ColumnDef<Issue>[] = [
  // {
  //   accessorKey: "createdAt",
  //   header: "Criação",
  // },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  // {
  //   accessorKey: "updatedAt",
  //   header: "Ultima atualizacao",
  // },
];
