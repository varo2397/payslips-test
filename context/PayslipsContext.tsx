import { mockPayslips } from '@const/mockPayslips';
import type { Payslip } from '@models/payslip';
import { compareAsc, compareDesc, parseISO } from 'date-fns';
import type { ReactNode } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

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

export function PayslipsProvider({ children }: { children: ReactNode }) {
  const [payslips] = useState<Payslip[]>(mockPayslips);
  const [sortOrder, setSortOrder] = useState<SortOrder>('recent');
  const [filterQuery, setFilterQuery] = useState('');

  const visiblePayslips = useMemo(() => {
    const filtered = payslips.filter((item) => {
      if (!filterQuery.trim()) return true;
      const query = filterQuery.trim().toLowerCase();
      return item.id.toLowerCase().includes(query);
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === 'oldest') {
        return compareAsc(parseISO(a.fromDate), parseISO(b.fromDate));
      }
      return compareDesc(parseISO(a.fromDate), parseISO(b.fromDate));
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
