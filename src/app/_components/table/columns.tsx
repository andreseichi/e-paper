"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { TransactionTableHeader } from "./transaction-table-header";
import { Ellipsis, Trash, View } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    accessorKey: "name",
    header: ({ column }) => (
      <TransactionTableHeader
        label="Nome do documento"
        sortDirection={column.getIsSorted() as string}
      />
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
    header: ({ column }) => (
      <TransactionTableHeader
        label="Emitente"
        sortDirection={column.getIsSorted() as string}
      />
    ),
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
    header: ({ column }) => (
      <TransactionTableHeader
        label="Valor dos tributos"
        sortDirection={column.getIsSorted() as string}
      />
    ),
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
    header: ({ column }) => (
      <TransactionTableHeader
        label="Valor líquido"
        sortDirection={column.getIsSorted() as string}
      />
    ),
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
    header: ({ column }) => (
      <TransactionTableHeader
        label="Data de criação"
        sortDirection={column.getIsSorted() as string}
      />
    ),
    cell: ({ row }) =>
      new Date(row.original.date).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "updatedDate",
    header: ({ column }) => (
      <TransactionTableHeader
        label="Última atualização"
        sortDirection={column.getIsSorted() as string}
      />
    ),
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
