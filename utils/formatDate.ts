import { format, parseISO } from 'date-fns';

export const formatDate = (isoDate: string, pattern: string = 'yyyy-MM-dd'): string => {
  return format(parseISO(isoDate), pattern);
};
