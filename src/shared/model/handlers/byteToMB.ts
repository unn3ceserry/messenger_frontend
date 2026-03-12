export const byteToMB = (bytes: number): {size: string, unit: string} => {
  const mb = bytes / (1024 * 1024);
  const kb = bytes / 1024;

  if (mb < 1) {
    return {size: kb.toFixed(1), unit: "KB"};
  }
  return {size: mb.toFixed(1), unit: "MB"};
};
