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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { documentOrigins } from "@/server/data/documentOrigins";
import { documentTypes } from "@/server/data/documentTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowRight, Check, ChevronsUpDown, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FileUploader } from "./file-uploader";

const FormSchema = z.object({
  code: z.string().length(4).optional(),
  origin: z.string().optional(),
  type: z.string().optional(),
  file: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.size < 10 * 1024 * 1024,
          "Arquivo deve ser menor que 10MB",
        ),
    )
    .optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export function NewDocumentButton() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto self-end justify-self-end px-4" size="lg">
          <Plus /> Novo documento
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form>
            <DialogHeader className="mb-6">
              <DialogTitle>Criar novo documento</DialogTitle>
              <DialogDescription>
                Insira os dados necessários para criar
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP
                        maxLength={4}
                        pattern={REGEXP_ONLY_DIGITS}
                        {...field}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1">
                    <FormLabel className="flex items-center">
                      Origem do documento
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
                              ? documentOrigins.find(
                                  (item) => item.value === field.value,
                                )?.label
                              : documentOrigins[0]?.label}
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
                            <CommandEmpty>
                              Documento não encontrado
                            </CommandEmpty>
                            <CommandGroup>
                              {documentOrigins.map((item) => (
                                <CommandItem
                                  value={item.label}
                                  key={item.value}
                                  onSelect={() => {
                                    form.setValue("origin", item.value);
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
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1">
                    <FormLabel className="flex items-center">
                      Tipo de documento
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
                              : documentTypes[0]?.label}
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

              <FileUploader />

              <Separator />
            </div>
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button>
                Criar documento <ArrowRight />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
