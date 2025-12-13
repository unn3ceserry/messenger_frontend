import { makeStore } from "@/app";
import { sessionApi } from "@/entities/session/api/authApi";
import { isErrorWithMessageAndType, Notification } from "@/shared";
import { SignUpType } from "@/entities";

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
    }
    throw error;
  }
};
