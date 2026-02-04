import { Paths, File } from 'expo-file-system';

export const getDocumentDirectory = (): string => {
  if (!Paths.document) {
    throw new Error('Document directory is not available');
  }
  return Paths.document.uri;
};

export const getCacheDirectory = (): string => {
  if (!Paths.cache) {
    throw new Error('Cache directory is not available');
  }
  return Paths.cache.uri;
};

export const copyFile = async (from: string, to: string): Promise<void> => {
  const sourceFile = new File(from);
  const destinationFile = new File(to);
  
  await sourceFile.copy(destinationFile);
};

export const fileSystemService = {
  getDocumentDirectory,
  getCacheDirectory,
  copyFile,
};
