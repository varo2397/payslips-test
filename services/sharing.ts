import * as Sharing from 'expo-sharing';

export const isAvailable = async (): Promise<boolean> => {
  return await Sharing.isAvailableAsync();
};

export const shareFile = async (
  fileUri: string,
  options: { mimeType: string; dialogTitle: string },
): Promise<void> => {
  await Sharing.shareAsync(fileUri, options);
};

export const sharingService = {
  isAvailable,
  shareFile,
};
