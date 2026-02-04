import type { Payslip } from '@models/payslip';
import { formatDate } from '@utils/formatDate';
import { FlatList } from 'react-native';

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
          subtitle={`${formatDate(item.fromDate)} to ${formatDate(item.toDate)}`}
          onPress={() => onItemPress(item)}
        />
      )}
    />
  );
}
