"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ColumnDef } from "@tanstack/react-table";
import { Ellipsis, FileText, Trash, View } from "lucide-react";

export type Document = {
  id: string;
  name: string;
  issuer: string;
  value: number;
  totalValue: number;
  date: string;
  updatedDate: string;
};

export const columns: ColumnDef<Document>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar todos os documentos"
        className="mr-2"
      />
    ),
    cell: ({ row }) => (
      <div className="">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Selecionar linha"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => <span className="mr-2">Nome do documento</span>,
    cell: ({ row }) => (
      <div className="flex items-center space-x-3">
        <FileText />

        <div className="flex flex-col justify-center">
          <span className="text-xs">Cód. 0000</span>
          <span>
            {row.original.name.length > 20
              ? row.original.name.substring(0, 20) + "..."
              : row.original.name}
          </span>
        </div>
      </div>
    ),
    footer: ({ column }) => (
      <div className="flex flex-col text-xs font-normal text-neutral-500">
        Total{" "}
        <span className="text-sm">
          {column.getFacetedRowModel().rows.length}{" "}
          {column.getFacetedRowModel().rows.length > 1
            ? "documentos"
            : "documento"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "issuer",
    header: () => <span className="mr-2">Emitente</span>,
    footer: ({ column }) => (
      <div className="flex flex-col text-xs font-normal text-neutral-500">
        Total
        <span className="text-sm">
          {
            new Set(
              column
                .getFacetedRowModel()
                .rows.map((row) => row.original.issuer),
            ).size
          }{" "}
          {new Set(
            column.getFacetedRowModel().rows.map((row) => row.original.issuer),
          ).size > 1
            ? "emitentes"
            : "emitente"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "value",
    header: () => <span className="mr-2">Valor dos tributos</span>,
    cell: ({ row }) => (
      <span>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(row.original.value))}
      </span>
    ),
    footer: ({ column }) => (
      <div className="flex flex-col text-xs font-normal text-neutral-500">
        Total de tributos
        <span className="text-sm">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(
            column
              .getFacetedRowModel()
              .rows.reduce((acc, row) => acc + Number(row.original.value), 0),
          )}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "totalValue",
    header: () => <span className="mr-2">Valor líquido</span>,
    cell: ({ row }) => (
      <span>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(row.original.totalValue))}
      </span>
    ),
    footer: ({ column }) => (
      <div className="flex flex-col text-xs font-normal text-neutral-500">
        Total valor líquido
        <span className="text-sm">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(
            column
              .getFacetedRowModel()
              .rows.reduce(
                (acc, row) => acc + Number(row.original.totalValue),
                0,
              ),
          )}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: () => <span className="mr-2">Data de criação</span>,
    cell: ({ row }) =>
      new Date(row.original.date).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "updatedDate",
    header: () => <span className="mr-2">Última atualização</span>,
    cell: ({ row }) =>
      new Date(row.original.updatedDate).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="space-x-1 justify-self-end">
          <Button variant="ghost" size="icon">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <Button variant="ghost" className="w-full justify-start">
            <View size={16} />
            Visualizar
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Trash size={16} />
            Excluir documento
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
];
