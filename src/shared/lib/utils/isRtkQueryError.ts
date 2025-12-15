import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

export function isErrorWithMessageAndType(
  error: unknown
): error is { data: { message: string; type?: string } } {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as any).data === "object" &&
    (error as any).data !== null &&
    "message" in (error as any).data &&
    typeof (error as any).data.message === "string"
  );
}

export function isErrorWithMessage(
  error: unknown
): error is { message: string | string[]; type?: string } {
  if (typeof error !== "object" || error === null) return false;

  const e = error as any;

  if ("data" in e && e.data && "message" in e.data) {
    const msg = e.data.message;
    return typeof msg === "string" || Array.isArray(msg);
  }

  if ("message" in e) {
    const msg = e.message;
    return typeof msg === "string" || Array.isArray(msg);
  }

  return false;
}
