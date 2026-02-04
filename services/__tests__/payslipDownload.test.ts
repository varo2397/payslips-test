import { payslipDownloadService } from '../payslipDownload';

const mockLoadAsset = jest.fn();
const mockGetDocumentDirectory = jest.fn();
const mockDeleteFileIfExists = jest.fn();
const mockCopyFile = jest.fn();

jest.mock('@services/asset', () => ({
  assetService: {
    loadAsset: (...args: unknown[]) => mockLoadAsset(...args),
  },
}));

jest.mock('@services/fileSystem', () => ({
  fileSystemService: {
    getDocumentDirectory: () => mockGetDocumentDirectory(),
    deleteFileIfExists: (...args: unknown[]) => mockDeleteFileIfExists(...args),
    copyFile: (...args: unknown[]) => mockCopyFile(...args),
  },
}));

describe('payslipDownloadService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('copies the file and returns the saved filename', async () => {
    mockLoadAsset.mockResolvedValue('file:///tmp/pay-001.pdf');
    mockGetDocumentDirectory.mockReturnValue('file:///documents/');

    const result = await payslipDownloadService.downloadPayslip({
      file: 1,
      fileType: 'pdf',
      fileName: 'PAY-001_payslip',
    });

    expect(result).toBe('PAY-001_payslip.pdf');
    expect(mockDeleteFileIfExists).toHaveBeenCalledWith('file:///documents/PAY-001_payslip.pdf');
    expect(mockCopyFile).toHaveBeenCalledWith(
      'file:///tmp/pay-001.pdf',
      'file:///documents/PAY-001_payslip.pdf',
    );
  });
});
