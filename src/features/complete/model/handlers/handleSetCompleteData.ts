import { makeStore } from "@/app";
import { UserCompleteData, userApi } from "@/entities";
import { isErrorWithMessageAndType, Notification } from "@/shared";

export const handleSetCompleteData = async ({
  cloudPassword,
  birthday,
  email
}: UserCompleteData) => {
  try {
    await makeStore
      .dispatch(
        userApi.endpoints.setCompleteData.initiate({ birthday, cloudPassword, email })
      )
      .unwrap();
  } catch (error: unknown) {
    if (isErrorWithMessageAndType(error)) {
      Notification(error.data.message);
    }
    throw error;
  }
};
