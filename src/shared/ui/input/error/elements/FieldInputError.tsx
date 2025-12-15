'use client'

import type {
  FieldErrors,
  FieldValues,
} from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

type TError<T extends FieldValues> = {
  field: keyof T;
  errors: FieldErrors<T>;
};


const FieldInputError = <T extends FieldValues>({ errors, field }: TError<T>) => {
  const t = useTranslations();
  const error = errors[field];
  return (
    <AnimatePresence>
      {error && (
        <motion.span
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 20, opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-[.8rem]"
        >
          {typeof error.message === "string" && t(error.message)}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default FieldInputError;