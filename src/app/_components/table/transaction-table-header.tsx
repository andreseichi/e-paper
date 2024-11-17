import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

interface TransactionTableHeaderProps {
  label: string;
  sortDirection: string;
}

export function TransactionTableHeader({ label, sortDirection }: TransactionTableHeaderProps) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start pl-0 hover:bg-inherit"
    >
    
      {label}
      {{
        asc: <ArrowUp className="ml-2" size={4} />,
        desc: <ArrowDown className="ml-2" size={4} />,
      }[sortDirection] ?? null}
    </Button>
  );
}
