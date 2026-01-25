import { makeStore } from "@/app";
import { contactsApi } from "../../api";
import {
  isErrorWithMessage,
  isErrorWithMessageAndType,
  Notification,
} from "@/shared";
import { Dispatch, SetStateAction } from "react";

export const handleEditContact = async ({
  firstName,
  lastName,
  username,
  setIsOpen,
}: {
  firstName?: string;
  lastName?: string;
  username: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  try {
    await makeStore
      .dispatch(
        contactsApi.endpoints.editContact.initiate({
          username,
          firstName,
          lastName,
        }),
      )
      .unwrap();
    setIsOpen(false);
  } catch (error: unknown) {
    if (isErrorWithMessageAndType(error)) {
      Notification(error.data.message);
    } else if (isErrorWithMessage(error)) {
      const msg = Array.isArray((error as any).data?.message ?? error.message)
        ? ((error as any).data?.message ?? error.message)[0]
        : ((error as any).data?.message ?? error.message);
      Notification(msg);
    }
  }
};
