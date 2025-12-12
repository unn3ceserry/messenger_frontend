import { makeStore } from "@/app";
import type { SignInType } from "../../model";
import { sessionApi } from "@/entities/session/api/authApi";
import { isErrorWithMessageAndType } from "@/shared";

export const handleAuthUser = async ({
  number,
  cloudPassword,
  code,
}: SignInType) => {
  try {
    await makeStore
      .dispatch(
        sessionApi.endpoints.signIn.initiate({ number, cloudPassword, code })
      )
      .unwrap();

    window.location.href = "/";
  } catch (error: unknown) {
    const err = isErrorWithMessageAndType(error);
    throw error;
  }
};
