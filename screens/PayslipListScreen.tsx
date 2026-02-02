import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { RootStackParamList } from '@navigation/types';
import { List } from '@components/list';
import { usePayslips } from '@context/PayslipsContext';

type Props = NativeStackScreenProps<RootStackParamList, 'PayslipList'>;

export function PayslipListScreen({ navigation }: Props) {
  const { visiblePayslips } = usePayslips();

  return (
    <View style={styles.container}>
      <List data={visiblePayslips} onItemPress={(item) => navigation.push('PayslipDetails', {id: item.id})}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 10,
  },
  itemTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  itemSubtitle: {
    color: '#4b5563',
  },
});
