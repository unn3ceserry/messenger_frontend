import { useFormatter, useTranslations } from "next-intl";

export const useFormattedChatDate = (timestamp: number) => {
  const format = useFormatter();
  const t = useTranslations();
  const today = new Date();
  const date = new Date(timestamp);
  const dateTime = format.dateTime(date, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isSameDay =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isSameDay) {
    return `${t("formattDate.todayIn")} ${dateTime}`;
  } else if (isYesterday) {
    return `${t("formattDate.yesterdayIn")} ${dateTime}`;
  } else if (date.getFullYear() === today.getFullYear()) {
    const dateStr = format.dateTime(date, { day: "2-digit", month: "long" });
    return `${dateStr} ${t("formattDate.in")} ${dateTime}`;
  } else {
    const dateStr = format.dateTime(date, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    return `${dateStr} ${t("formattDate.in")} ${dateTime}`;
  }
};
