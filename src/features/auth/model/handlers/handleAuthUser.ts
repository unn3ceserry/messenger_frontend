import { makeStore } from "@/app";
import type { SignInType } from "../../model";
import { sessionApi } from "@/entities";
import {
  appNotification,
  isErrorWithMessage,
  isErrorWithMessageAndType,
  Notification,
} from "@/shared";

export const handleAuthUser = async ({
  number,
  cloudPassword,
  code,
}: SignInType) => {
  try {
    await makeStore
      .dispatch(
        sessionApi.endpoints.signIn.initiate({ number, cloudPassword, code }),
      )
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

    throw error;
  }
};
