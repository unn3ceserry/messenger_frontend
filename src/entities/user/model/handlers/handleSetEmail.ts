import { makeStore } from "@/app";
import { userApi } from "../../api";
import { openComponent } from "../store/userUiSlice";
import {
  isErrorWithMessage,
  isErrorWithMessageAndType,
  Notification,
} from "@/shared";

export const handleSetEmail = async (email: string) => {
  try {
    await makeStore
      .dispatch(userApi.endpoints.setEmail.initiate(email))
      .unwrap();
    await makeStore.dispatch(openComponent("userSettingsPrivacy"));
  } catch (error: unknown) {
    if (isErrorWithMessageAndType(error)) {
      Notification(error.data.message);
    } else if (isErrorWithMessage(error)) {
      const msg = Array.isArray((error as any).data?.message ?? error.message)
        ? ((error as any).data?.message ?? error.message)[0]
        : (error as any).data?.message ?? error.message;
      Notification(msg);
    }
  }
};
