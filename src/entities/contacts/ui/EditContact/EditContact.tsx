"use client";

import { ChangeEvent, FC, useState } from "react";
import EditContactHeader from "./elements/EditContactHeader";
import { motion, AnimatePresence } from "framer-motion";
import { AppInput, RenderAvatarElement } from "@/shared";
import { useTranslations } from "next-intl";
import { userApi } from "@/entities/user";
import { Check } from "lucide-react";
import { handleEditContact } from "../../model";

interface Props {
  username: string;
}

const EditContact: FC<Props> = ({ username }) => {
  const t = useTranslations();

  const [isDirty, setIsDirty] = useState<boolean>(false);
  const { data, isLoading } = userApi.useGetUserDataQuery({
    username: username,
  });

  const [values, setValues] = useState<{ firstname: string; lastname: string }>(
    {
      firstname: data?.firstName ?? "",
      lastname: data?.lastName ?? "",
    },
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "firstname" | "lastname",
  ) => {
    if (!isDirty) setIsDirty(true);
    setValues((prev) => ({ ...prev, [type]: e.target.value }));
  };

  {
    /* сделать тут лоадер в будущем */
  }
  if (isLoading || !data) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center justify-start">
      <EditContactHeader username={username} />
      <motion.div
        exit={{ opacity: 0, scale: 0.8, x: 300 }}
        initial={{ opacity: 0, scale: 0.8, x: 300 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full flex flex-col items-start justify-center gap-3"
      >
        {/* info */}
        <div className="flex flex-col items-center w-full gap-3 cursor-pointer p-3">
          <RenderAvatarElement
            hasAvatar={!!data?.avatars?.length}
            size={130}
            avatar={data.avatars ? data.avatars[data.avatars.length - 1] : ""}
          />
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl">
              {data.firstName} {data.lastName}
            </p>
          </div>
        </div>

        {/* form for change contact data */}
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

          <AnimatePresence>
            {isDirty && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={async () =>
                  await handleEditContact({
                    username,
                    firstName: values.firstname,
                    lastName: values.lastname,
                    setIsOpen: setIsDirty,
                  })
                }
                className="absolute bottom-5 right-5 p-3 bg-accent flex items-center justify-center rounded-full cursor-pointer"
              >
                <Check size={25} className="text-white" />
              </motion.button>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
};

export default EditContact;
