"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { tableData } from "@/server/data/tableData";
import { Search } from "lucide-react";
import { FilterDocumentButton } from "./_components/filter-document-button";
import { NewDocumentButton } from "./_components/new-document-button";
import { columns } from "./_components/table/columns";
import { DataTable } from "./_components/table/data-table";
import { FormTableFilter } from "./_components/table/form-table-filter";

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
