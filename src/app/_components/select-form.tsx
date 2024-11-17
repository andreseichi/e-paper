import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleHelp } from "lucide-react";

interface SelectFormProps {
  label?: string;
}

export function SelectForm({ label }: SelectFormProps) {
  return (
    <div className="flex flex-col">
      <Label className="flex items-center text-sm font-bold text-neutral-700">
        {label}
        <CircleHelp size={16} className="ml-1 text-muted-foreground" />
      </Label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
