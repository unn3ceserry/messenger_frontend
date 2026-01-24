import { makeStore } from "@/app";
import { contactsApi } from "../../api";
import { isErrorWithMessage, isErrorWithMessageAndType, Notification } from "@/shared";

export const handleAddContact = async ({
  firstName,
  lastName,
  username,
}: {
  firstName?: string;
  lastName?: string;
  username: string;
}) => {
  try {
    await makeStore
      .dispatch(contactsApi.endpoints.addToContact.initiate({ username, firstName, lastName }))
      .unwrap();
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
