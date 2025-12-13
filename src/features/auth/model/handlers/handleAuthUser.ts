import { makeStore } from "@/app";
import type { SignInType } from "../../model";
import { sessionApi } from "@/entities/session/api/authApi";

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

  } catch (error: unknown) {
    throw error;
  }
};
