"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { FilterDocumentButton } from "./_components/filter-document-button";
import { NewDocumentButton } from "./_components/new-document-button";
import { columns, type Document } from "./_components/table/columns";
import { DataTable } from "./_components/table/data-table";
import { FormTableFilter } from "./_components/table/form-table-filter";

const tableData = [
  {
    id: "1",
    name: "Documento 1",
    issuer: "Emitente 1",
    value: 1000,
    totalValue: 800,
    date: "2021-08-01",
    updatedDate: "2021-08-01",
  },
  {
    id: "2",
    name: "Documento 2",
    issuer: "Emitente 2",
    value: 2000,
    totalValue: 1800,
    date: "2021-08-02",
    updatedDate: "2021-08-02",
  },
  {
    id: "3",
    name: "Documento 3",
    issuer: "Emitente 3",
    value: 3000,
    totalValue: 2800,
    date: "2021-08-03",
    updatedDate: "2021-08-03",
  },
  {
    id: "4",
    name: "Documento 4",
    issuer: "Emitente 4",
    value: 4000,
    totalValue: 3800,
    date: "2021-08-04",
    updatedDate: "2021-08-04",
  },
  {
    id: "5",
    name: "Documento 5",
    issuer: "Emitente 5",
    value: 5000,
    totalValue: 4800,
    date: "2021-08-05",
    updatedDate: "2021-08-05",
  },
  {
    id: "6",
    name: "Documento 6",
    issuer: "Emitente 6",
    value: 6000,
    totalValue: 5800,
    date: "2021-08-06",
    updatedDate: "2021-08-06",
  },
  {
    id: "7",
    name: "Documento 7",
    issuer: "Emitente 7",
    value: 7000,
    totalValue: 6800,
    date: "2021-08-07",
    updatedDate: "2021-08-07",
  },
  {
    id: "8",
    name: "Documento 8",
    issuer: "Emitente 8",
    value: 8000,
    totalValue: 7800,
    date: "2021-08-08",
    updatedDate: "2021-08-08",
  },
  {
    id: "9",
    name: "Documento 9",
    issuer: "Emitente 8",
    value: 9000,
    totalValue: 8800,
    date: "2021-08-09",
    updatedDate: "2021-08-09",
  },
  {
    id: "10",
    name: "Documento 10",
    issuer: "Emitente 10",
    value: 10000,
    totalValue: 9800,
    date: "2021-08-10",
    updatedDate: "2021-08-10",
  },
  {
    id: "11",
    name: "Documento 11",
    issuer: "Emitente 11",
    value: 11000,
    totalValue: 10800,
    date: "2021-08-11",
    updatedDate: "2021-08-11",
  },
  {
    id: "12",
    name: "Documento 12",
    issuer: "Emitente 12",
    value: 12000,
    totalValue: 11800,
    date: "2021-08-12",
    updatedDate: "2021-08-12",
  },
  {
    id: "13",
    name: "Documento 13",
    issuer: "Emitente 13",
    value: 13000,
    totalValue: 12800,
    date: "2021-08-13",
    updatedDate: "2021-08-13",
  },
  {
    id: "14",
    name: "Documento 14",
    issuer: "Emitente 14",
    value: 14000,
    totalValue: 13800,
    date: "2021-08-14",
    updatedDate: "2021-08-14",
  },
  {
    id: "15",
    name: "Documento 15",
    issuer: "Emitente 15",
    value: 15000,
    totalValue: 14800,
    date: "2021-08-15",
    updatedDate: "2021-08-15",
  },
] as Document[];

export default function HomePage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex flex-1 justify-between max-md:flex-col max-md:space-y-6">
            <div className="flex flex-col space-y-1">
              <h2 className="text-2xl font-bold">Documentos</h2>
              <span className="text-sm text-muted-foreground">
                Crie, gerencie e visualize os documentos
              </span>
            </div>

            <div className="flex items-center justify-between space-x-4 max-sm:flex-col">
              <div className="h-10 space-y-2 max-md:w-full">
                <div className="relative">
                  <Input
                    className="py-5 pe-24 ps-5"
                    placeholder="Buscar documentos..."
                    type="search"
                  />
                  <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-4 text-muted-foreground">
                    <Search size={20} />
                  </div>
                </div>
              </div>
              <FilterDocumentButton />
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mb-4 flex flex-1">
            <div className="flex items-center space-x-8">
              <FormTableFilter />
            </div>

            <NewDocumentButton />
          </div>

          <DataTable columns={columns} data={tableData} />
        </main>
      </div>
    </div>
  );
}
