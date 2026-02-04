import { fileSystemService } from './fileSystem';
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
}: DownloadPayslipParams): Promise<string> => {
  const localUri = await assetService.loadAsset(file);

  const actualExtension = localUri.split('.').pop() || 'pdf';
  const timestamp = Date.now();
  const fullFileName = `${fileName}_${timestamp}.${actualExtension}`;

  const fileUri = `${fileSystemService.getDocumentDirectory()}${fullFileName}`;
  await fileSystemService.copyFile(localUri, fileUri);

  return fullFileName;
};

export const payslipDownloadService = {
  downloadPayslip,
};
