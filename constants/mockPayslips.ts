import { Payslip } from '../types/payslip';

const mockPdfFile = require('../assets/sample-local-pdf.pdf');
const mockImageFile = require('../assets/sample-local-image.jpg');

export const mockPayslips: Payslip[] = [
  {
    id: 'PAY-001',
    fromDate: '2026-01-01T00:00:00.000Z',
    toDate: '2026-01-31T23:59:59.999Z',
    fileType: 'pdf',
    file: mockPdfFile,
  },
  {
    id: 'PAY-002',
    fromDate: '2025-12-01T00:00:00.000Z',
    toDate: '2025-12-31T23:59:59.999Z',
    fileType: 'pdf',
    file: mockPdfFile,
  },
  {
    id: 'PAY-003',
    fromDate: '2025-11-01T00:00:00.000Z',
    toDate: '2025-11-30T23:59:59.999Z',
    fileType: 'image',
    file: mockImageFile,
  },
  {
    id: 'PAY-004',
    fromDate: '2025-10-01T00:00:00.000Z',
    toDate: '2025-10-31T23:59:59.999Z',
    fileType: 'pdf',
    file: mockPdfFile,
  },
  {
    id: 'PAY-005',
    fromDate: '2025-09-01T00:00:00.000Z',
    toDate: '2025-09-30T23:59:59.999Z',
    fileType: 'image',
    file: mockImageFile,
  },
];
