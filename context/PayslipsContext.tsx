import type { ReactNode } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

export type Payslip = {
  id: string;
  fromDate: string;
  toDate: string;
  fileType: 'pdf' | 'image';
};

export type SortOrder = 'recent' | 'oldest';

type PayslipsContextValue = {
  payslips: Payslip[];
  visiblePayslips: Payslip[];
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  filterQuery: string;
  setFilterQuery: (query: string) => void;
  getById: (id: string) => Payslip | undefined;
};

const PayslipsContext = createContext<PayslipsContextValue | undefined>(undefined);

const seedPayslips: Payslip[] = [
  {
    id: 'PSL-001',
    fromDate: '2025-12-01',
    toDate: '2025-12-31',
    fileType: 'pdf',
  },
  {
    id: 'PSL-002',
    fromDate: '2025-11-01',
    toDate: '2025-11-30',
    fileType: 'image',
  },
  {
    id: 'PSL-003',
    fromDate: '2025-10-01',
    toDate: '2025-10-31',
    fileType: 'pdf',
  },
];

export function PayslipsProvider({ children }: { children: ReactNode }) {
  const [payslips] = useState<Payslip[]>(seedPayslips);
  const [sortOrder, setSortOrder] = useState<SortOrder>('recent');
  const [filterQuery, setFilterQuery] = useState('');

  const visiblePayslips = useMemo(() => {
    const filtered = payslips.filter((item) => {
      if (!filterQuery.trim()) return true;
      const query = filterQuery.trim().toLowerCase();
      return (
        item.id.toLowerCase().includes(query) ||
        item.fromDate.toLowerCase().includes(query) ||
        item.toDate.toLowerCase().includes(query)
      );
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === 'oldest') {
        return a.fromDate.localeCompare(b.fromDate);
      }
      return b.fromDate.localeCompare(a.fromDate);
    });

    return sorted;
  }, [filterQuery, payslips, sortOrder]);

  const getById = (id: string) => payslips.find((item) => item.id === id);

  const value: PayslipsContextValue = {
    payslips,
    visiblePayslips,
    sortOrder,
    setSortOrder,
    filterQuery,
    setFilterQuery,
    getById,
  };

  return <PayslipsContext.Provider value={value}>{children}</PayslipsContext.Provider>;
}

export function usePayslips() {
  const context = useContext(PayslipsContext);
  if (!context) {
    throw new Error('usePayslips must be used within PayslipsProvider');
  }
  return context;
}
