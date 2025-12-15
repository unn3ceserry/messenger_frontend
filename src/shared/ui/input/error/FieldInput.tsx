'use client'

import type { ReactNode } from "react";
import type { FieldErrors, FieldValues } from "react-hook-form";
import FieldInputError from "./elements/FieldInputError";

type TFiled<T extends FieldValues> = {
  field: keyof T;
  errors: FieldErrors<T>;
  input: ReactNode;
};

const FieldInput = <T extends FieldValues>({
  errors,
  field,
  input,
}: TFiled<T>) => {
  return (
    <div className="w-full space-y-2">
      {input}

      <FieldInputError<T> errors={errors} field={field} />
    </div>
  );
};

export default FieldInput;
