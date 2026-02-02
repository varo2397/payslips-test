export type RootStackParamList = {
  PayslipList: undefined;
  PayslipDetails: {
    id: string;
    fromDate: string;
    toDate: string;
    fileType: 'pdf' | 'image';
  };
};
