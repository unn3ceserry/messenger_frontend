import { makeStore } from "@/app";
import { sessionApi } from "@/entities";
import {
  appNotification,
  isErrorWithMessage,
  isErrorWithMessageAndType,
} from "@/shared";

export const handleLogout = async () => {
  try {
    await makeStore.dispatch(sessionApi.endpoints.logout.initiate()).unwrap();
  } catch (error: unknown) {
    if (isErrorWithMessageAndType(error)) {
      appNotification({text: error.data.message});
    } else if (isErrorWithMessage(error)) {
      const msg = Array.isArray((error as any).data?.message ?? error.message)
        ? ((error as any).data?.message ?? error.message)[0]
        : (error as any).data?.message ?? error.message;
      appNotification(msg);
    }

    throw error;
  }
};
