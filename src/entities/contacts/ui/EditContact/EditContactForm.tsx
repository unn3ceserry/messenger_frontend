"use client";

import { AppInput } from "@/shared";
import { useTranslations } from "next-intl";
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

interface Props {
  setValues: Dispatch<
    SetStateAction<{
      firstname: string;
      lastname: string;
    }>
  >;
  setIsDirty: Dispatch<SetStateAction<boolean>>;
  values: {
    firstname: string;
    lastname: string;
  };
  isDirty: boolean;
}

const EditContactForm: FC<Props> = ({ setIsDirty, setValues, values, isDirty }) => {

  const t = useTranslations()

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "firstname" | "lastname",
  ) => {
    if (!isDirty) setIsDirty(true);
    setValues((prev) => ({ ...prev, [type]: e.target.value }));
  };

  return (
    <form
      className="flex flex-col w-full items-center justify-start gap-5 px-5"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-3 items-center justify-center w-full">
        <AppInput
          placeholder={t(
            "settings.editProfileSettings.inputFirstNamePlaceholder",
          )}
          onChange={(e) => handleChange(e, "firstname")}
          value={values.firstname}
        />
        <AppInput
          placeholder={t(
            "settings.editProfileSettings.inputLastNamePlaceholder",
          )}
          onChange={(e) => handleChange(e, "lastname")}
          value={values.lastname}
        />
      </div>
    </form>
  );
};

export default EditContactForm;
