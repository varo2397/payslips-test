import { FlatList } from 'react-native';
import { format, parseISO } from 'date-fns';

import type { Payslip } from '@models/payslip';

import { ListItem } from '../listItem';
import { styles } from './styles';

export type ListProps = {
  data: Payslip[];
  onItemPress: (item: Payslip) => void;
};

export function List({ data, onItemPress }: ListProps) {
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ListItem
          id={item.id}
          title={item.id}
          subtitle={`${format(parseISO(item.fromDate), 'yyyy-MM-dd')} to ${format(parseISO(item.toDate), 'yyyy-MM-dd')}`}
          onPress={() => onItemPress(item)}
        />
      )}
    />
  );
}
