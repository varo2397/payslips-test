import { FlatList } from 'react-native';

import type { Payslip } from '@types/payslip';

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
          subtitle={`${item.fromDate} - ${item.toDate}`}
          onPress={() => onItemPress(item)}
        />
      )}
    />
  );
}
