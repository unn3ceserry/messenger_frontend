"use client";

import { contactsApi, UserContactElement } from "@/entities";
import { UserSettingsHeaderConstructor } from "@/shared";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const UserContacts = () => {
  const t = useTranslations();

  const { data, isLoading } = contactsApi.useGetMyContactsQuery();

  {
    /* сделать тут лоадер в будущем */
  }
  if (isLoading || !data) {
    return null;
  }

  return (
    <div className="z-1233 flex flex-col items-center justify-start h-screen overflow-y-auto text-default-text-color scrollbar-thin w-full">
      <motion.div
        exit={{ opacity: 0, scale: 0.8, x: -300 }}
        initial={{ opacity: 0, scale: 0.8, x: -300 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full flex flex-col items-center justify-start"
      >
        <UserSettingsHeaderConstructor
          backUI={null}
          title="contacts.title"
          typeHeader="default"
        />
        <div className="flex flex-col items-start justify-center w-full p-2 px-3 gap-1">
          {data.length ? (
            data.map((el, i) => <UserContactElement key={i} username={el.usernameContact} />)
          ) : (
            <p className="text-icons-color text-[.9rem]">
              {t("contacts.contactsListEmpty")}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UserContacts;
