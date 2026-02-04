import { getFileExtension } from '@utils/fileExtension';

import { assetService } from './asset';
import { fileSystemService } from './fileSystem';

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

  const actualExtension = getFileExtension(localUri, 'pdf');
  const fullFileName = `${fileName}.${actualExtension}`;

  const fileUri = `${fileSystemService.getDocumentDirectory()}${fullFileName}`;

  fileSystemService.deleteFileIfExists(fileUri);

  await fileSystemService.copyFile(localUri, fileUri);

  return fullFileName;
};

export const payslipDownloadService = {
  downloadPayslip,
};
