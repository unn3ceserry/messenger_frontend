"use client";

import { Button, DefaultInput } from "@/shared";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { SetStateAction, Dispatch, useState, FC } from "react";
import { useUserCompleteDataStore } from "@/entities";
import { Calendar1, KeyRound, Mail } from "lucide-react";

interface ICompleteModal {
  setWhoVisible: Dispatch<
    SetStateAction<"email" | "birthday" | "password" | null>
  >;
  whoVisible: "email" | "birthday" | "password";
}

const CompleteModal: FC<ICompleteModal> = ({ whoVisible, setWhoVisible }) => {
  const [value, setValue] = useState("");
  const setData = useUserCompleteDataStore((s) => s.setData);
  const t = useTranslations();

  const handleSave = async () => {
    setData(value, whoVisible);
    setWhoVisible(null);
  };

  const inputType =
    whoVisible === "birthday"
      ? "date"
      : whoVisible === "password"
      ? "password"
      : "email";

  const inputIcon =
    whoVisible === "birthday" ? (
      <Calendar1 size={22} />
    ) : whoVisible === "password" ? (
      <KeyRound size={22} />
    ) : (
      <Mail size={22} />
    );

  const inputPlaceholder =
    whoVisible === "birthday"
      ? t("profileComplete.birthdayTitle")
      : whoVisible === "password"
      ? t("profileComplete.passwordTitle")
      : t("profileComplete.emailTitle");

  return (
    <form
      onSubmit={handleSave}
      className="flex flex-col items-center justify-center w-full gap-10"
    >
      <DefaultInput
        icon={inputIcon}
        type={inputType}
        placeholder={inputPlaceholder}
        value={value}
        onChange={(e) => setValue(e.target.value.toString())}
      />
      <div className="flex flex-col gap-4 w-full">
        <Button
          label={t("buttons.buttonSave")}
          type="submit"
          className="p-2.5"
        />

        <button
          type="button"
          onClick={() => setWhoVisible(null)}
          className="bg-rect-bg ring-2 ring-rect-boder cursor-pointer opacity-40 duration-500 hover:opacity-100 backdrop-blur-xl rounded-xl flex p-2.5 items-center justify-center w-full"
        >
          {t("buttons.buttonBack")}
        </button>
      </div>
    </form>
  );
};

export default CompleteModal;
