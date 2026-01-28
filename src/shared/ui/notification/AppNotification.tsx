import toast from "react-hot-toast";
import { ReactElement } from "react";

interface Props {
  icon: ReactElement | string;
  text: string;
}

export const appNotification = ({ icon, text }: Props) => {
  toast(text, {
    icon,
    style: {
      textAlign: 'end',
      borderRadius: "9999px",
      background: "#212121",
      color: "#fff",
    },
  });
};
