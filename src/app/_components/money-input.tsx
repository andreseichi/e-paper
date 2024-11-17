import { Input } from "@/components/ui/input";
import { type ForwardedRef, forwardRef } from "react";
import {
  NumericFormat,
  type NumericFormatProps
} from "react-number-format";

export const MoneyInput = forwardRef(
  (props: NumericFormatProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <NumericFormat
        {...props}
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        prefix="R$ "
        allowNegative={false}
        customInput={Input}
        getInputRef={ref}
        valueIsNumericString
        fixedDecimalScale
      />
    );
  },
);

MoneyInput.displayName = "MoneyInput";
