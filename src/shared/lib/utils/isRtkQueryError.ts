import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}

export function isErrorWithMessageAndType(
  error: unknown
): error is { data: { message: string; type: string } } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof (error as any).data === 'object' &&
    (error as any).data !== null &&
    'message' in (error as any).data &&
    typeof (error as any).data.message === 'string' &&
    'type' in (error as any).data &&
    typeof (error as any).data.type === 'string'
  );
}
