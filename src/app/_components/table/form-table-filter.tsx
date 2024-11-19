import { Button } from "@/components/ui/button";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, CircleHelp } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { documentTypes, originDocuments } from "./columns";

const FormTableFilterSchema = z.object({
  origin: z.string(),
  type: z.string(),
});

type FormTableFilter = z.infer<typeof FormTableFilterSchema>;

export function FormTableFilter() {
  const formTableFilter = useForm<FormTableFilter>({
    resolver: zodResolver(FormTableFilterSchema),
  });
  return (
    <Form {...formTableFilter}>
      <form className="flex">
        <div className="flex items-center space-x-8">
          <FormField
            control={formTableFilter.control}
            name="origin"
            render={({ field }) => (
              <FormItem className="flex min-w-[320px] flex-col space-y-1">
                <FormLabel className="flex items-center">
                  Origem do documento
                  <TooltipProvider delayDuration={400}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CircleHelp
                          size={16}
                          className="ml-1 text-muted-foreground"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>Local onde o documento foi gerado</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
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
                          ? originDocuments.find(
                              (item) => item.value === field.value,
                            )?.label
                          : "Filtrar origem"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Buscar origem..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>Documento não encontrado</CommandEmpty>
                        <CommandGroup>
                          {originDocuments.map((item) => (
                            <CommandItem
                              value={item.label}
                              key={item.value}
                              onSelect={() => {
                                formTableFilter.setValue("origin", item.value);
                              }}
                            >
                              {item.label}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  item.value === field.value
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

          <FormField
            control={formTableFilter.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex min-w-[320px] flex-col space-y-1">
                <FormLabel className="flex items-center">
                  Tipo de documento
                  <TooltipProvider delayDuration={400}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CircleHelp
                          size={16}
                          className="ml-1 text-muted-foreground"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>Classificação do documento</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
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
                          : "Filtrar tipo"}
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
                        <CommandEmpty>Documento não encontrado</CommandEmpty>
                        <CommandGroup>
                          {documentTypes.map((documentType) => (
                            <CommandItem
                              value={documentType.label}
                              key={documentType.value}
                              onSelect={() => {
                                formTableFilter.setValue(
                                  "type",
                                  documentType.value,
                                );
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
        </div>
      </form>
    </Form>
  );
}
