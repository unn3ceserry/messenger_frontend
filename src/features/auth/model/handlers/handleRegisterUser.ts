import { makeStore } from "@/app";
import { isErrorWithMessage, isErrorWithMessageAndType, Notification } from "@/shared";
import { SignUpType, sessionApi } from "@/entities";

export const handleRegisterUser = async ({
  number,
  firstName,
  lastName,
  username,
  code,
}: SignUpType) => {
  try {
    await makeStore
      .dispatch(
        sessionApi.endpoints.signUp.initiate({
          number,
          firstName,
          lastName,
          username,
          code,
        })
      )
      .unwrap();
  } catch (error: unknown) {
    if (isErrorWithMessageAndType(error)) {
      Notification(error.data.message);
    } else if (isErrorWithMessage(error)) {
      const msg = Array.isArray((error as any).data?.message ?? error.message)
        ? ((error as any).data?.message ?? error.message)[0]
        : (error as any).data?.message ?? error.message;
      Notification(msg);
    }

    throw error;
  }
};
