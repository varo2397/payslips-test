export type Payslip = {
  id: string;
  fromDate: string;
  toDate: string;
  fileType: 'pdf' | 'image';
  file: number;
};
