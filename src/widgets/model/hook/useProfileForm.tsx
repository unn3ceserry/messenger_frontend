import { useState, useCallback } from "react";

type Form = {
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  birthday: string;
};

export const useProfileForm = (initialData: Form) => {
  const [form, setForm] = useState<Form>(initialData);
  const [dirty, setDirty] = useState<Record<keyof Form, boolean>>({
    firstName: false,
    lastName: false,
    username: false,
    bio: false,
    birthday: false
  });

  const onChange = useCallback(
    <K extends keyof Form>(field: K, value: Form[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setDirty((prev) => ({ ...prev, [field]: true }));
    },
    []
  );

  const isDirty = Object.values(dirty).some(Boolean);

  return { form, dirty, onChange, setForm, setDirty, isDirty };
};
