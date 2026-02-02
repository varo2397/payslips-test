import * as FileSystem from 'expo-file-system';

export const getDocumentDirectory = (): string => {
  return FileSystem.documentDirectory || '';
};

export const copyFile = async (from: string, to: string): Promise<void> => {
  await FileSystem.copyAsync({ from, to });
};

export const fileSystemService = {
  getDocumentDirectory,
  copyFile,
};
