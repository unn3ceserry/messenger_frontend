export const readEntry = (entry: FileSystemEntry): Promise<Array<File>> => {
  if (entry.isFile) {
    return new Promise(res => (entry as FileSystemFileEntry).file(f => res([f])));
  }

  const reader = (entry as FileSystemDirectoryEntry).createReader();
  return new Promise(res =>
    reader.readEntries(async entries => {
      const files = await Promise.all(entries.map(readEntry));
      res(files.flat());
    })
  );
};

