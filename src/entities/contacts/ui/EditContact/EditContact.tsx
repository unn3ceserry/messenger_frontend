"use client";

import { FC, useState } from "react";
import EditContactHeader from "./EditContactHeader";
import { motion } from "framer-motion";
import {  CirclePopup, RenderAvatarElement, Spinner } from "@/shared";
import { userApi } from "@/entities/user";
import { handleEditContact } from "../../model";
import EditContactForm from "./EditContactForm";

interface Props {
  username: string;
}

const EditContact: FC<Props> = ({ username }) => {
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

  if (isLoading || !data) {
    return <Spinner/>;
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
        <EditContactForm
          isDirty={isDirty}
          setIsDirty={setIsDirty}
          setValues={setValues}
          values={values}
        />
      </motion.div>
      <div className="fixed bottom-5 right-5">
        <CirclePopup
          isDirty={isDirty}
          onClick={async () =>
            await handleEditContact({
              username,
              firstName: values.firstname,
              lastName: values.lastname,
              setIsOpen: setIsDirty,
            })
          }
        />
      </div>
    </div>
  );
};

export default EditContact;
