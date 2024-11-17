"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  Filter,
  Info,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MoneyInput } from "./money-input";

const FormSchema = z.object({
  dob: z.date().optional(),
  type: z.string().optional(),
  issuer: z.string().optional(),
  value: z.number().optional(),
  totalValue: z.number().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

const documentTypes = [
  { label: "Nota fiscal de serviço", value: "nfs" },
  { label: "Contrato de prestação de serviço", value: "cps" },
  { label: "Nota fiscal de produto", value: "nfp" },
  { label: "Nota fiscal de importação", value: "nfi" },
  { label: "Nota fiscal de exportação", value: "nfe" },
  { label: "Nota fiscal de transporte", value: "nft" },
] as const;

export function FilterDocumentButton() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dob: undefined,
      type: "",
      issuer: "",
      value: 0,
      totalValue: 0,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="h-10">
          <Filter size={16} /> Filtrar
        </Button>
      </SheetTrigger>

      <SheetContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <SheetHeader>
              <SheetTitle>Filtrar documentos</SheetTitle>
              <SheetDescription>
                Indique os dados necessários para realizar a filtragem
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              <Separator />

              <Alert className="">
                <Info size={16} />
                <AlertDescription>
                  Selecione o tipo de documento necessário para, a partir dele,
                  selecionar os tipos de índice para a filtragem.
                </AlertDescription>
              </Alert>

              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1">
                    <FormLabel>Período de criação</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            size="lg"
                            className={cn(
                              "w-full px-4 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              <span>
                                {field.value.toLocaleDateString("pt-BR")}
                              </span>
                            ) : (
                              <span>Selecione o período</span>
                            )}

                            <CalendarIcon className="ml-auto" size={20} />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1">
                    <FormLabel>Tipo de documento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            size="lg"
                            className={cn(
                              "w-full justify-between px-4",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? documentTypes.find(
                                  (documentType) =>
                                    documentType.value === field.value,
                                )?.label
                              : "Nota fiscal de serviço"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Buscar tipo..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>
                              Documento não encontrado
                            </CommandEmpty>
                            <CommandGroup>
                              {documentTypes.map((documentType) => (
                                <CommandItem
                                  value={documentType.label}
                                  key={documentType.value}
                                  onSelect={() => {
                                    form.setValue("type", documentType.value);
                                  }}
                                >
                                  {documentType.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      documentType.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="issuer"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1">
                      <FormLabel>Emitente</FormLabel>
                      <FormControl>
                        <Input
                          className="h-10"
                          placeholder="Razão social do emitente"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1">
                      <FormLabel>Valor total dos tributos</FormLabel>
                      <FormControl>
                        <MoneyInput
                          className="h-10"
                          placeholder="Valor em R$"
                          onValueChange={({ floatValue }) =>
                            field.onChange(floatValue)
                        }
                        value={field.value}
                          onBlur={field.onBlur}
                          disabled={field.disabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="totalValue"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1">
                      <FormLabel>Valor líquido</FormLabel>
                      <FormControl>
                        <MoneyInput
                          className="h-10"
                          placeholder="Valor em R$"
                          value={field.value}
                          onValueChange={({ floatValue }) =>
                            field.onChange(floatValue)
                          }
                          onBlur={field.onBlur}
                          disabled={field.disabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <SheetFooter>
                <Button variant="outline" onClick={() => form.reset()}>
                  Limpar
                </Button>
                {/* <Button type="submit" disabled={!form.formState.isDirty}> */}
                <Button type="submit">
                  Aplicar filtro
                </Button>
              </SheetFooter>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
