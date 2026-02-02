import { fileSystemService } from './fileSystem';
import { sharingService } from './sharing';
import { assetService } from './asset';

type DownloadPayslipParams = {
  file: number;
  fileType: 'pdf' | 'image';
  fileName: string;
};

export const downloadPayslip = async ({
  file,
  fileType,
  fileName,
}: DownloadPayslipParams): Promise<void> => {
  // Load the asset
  const localUri = await assetService.loadAsset(file);

  // Define the file extension based on fileType
  const fileExtension = fileType === 'pdf' ? 'pdf' : 'png';
  const fullFileName = `${fileName}.${fileExtension}`;
  const fileUri = `${fileSystemService.getDocumentDirectory()}${fullFileName}`;

  // Copy the file to the document directory
  await fileSystemService.copyFile(localUri, fileUri);

  // Share/save the file
  const canShare = await sharingService.isAvailable();
  if (canShare) {
    await sharingService.shareFile(fileUri, {
      mimeType: fileType === 'pdf' ? 'application/pdf' : 'image/png',
      dialogTitle: 'Save Payslip',
    });
  } else {
    throw new Error(`Sharing not available. File saved to: ${fileUri}`);
  }
};

export const payslipDownloadService = {
  downloadPayslip,
};
