"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {
  closeCallback: () => void;
  submitCallback: () => void;
}

const AddContactModalButtons: FC<Props> = ({
  closeCallback,
  submitCallback,
}) => {
  const t = useTranslations();

  return (
    <div className="flex w-full gap-3 items-center justify-center">
      <button
        onClick={closeCallback}
        type="button"
        className="ring-2 ring-rect-boder cursor-pointer opacity-40 duration-500 hover:opacity-100 rounded-xl flex p-2.5 items-center justify-center w-full"
      >
        {t("buttons.buttonBack")}
      </button>
      <button
        onClick={submitCallback}
        type="submit"
        className="ring-2 ring-rect-boder cursor-pointer opacity-40 duration-500 hover:opacity-100 rounded-xl flex p-2.5 items-center justify-center w-full"
      >
        {t("buttons.buttonSave")}
      </button>
    </div>
  );
};

export default AddContactModalButtons;
