import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { RootStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'PayslipList'>;

export function PayslipListScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payslip List</Text>
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('PayslipDetails', {
            id: 'PSL-001',
            fromDate: '2025-12-01',
            toDate: '2025-12-31',
            fileType: 'pdf',
          })
        }
      >
        <Text style={styles.itemTitle}>PSL-001</Text>
        <Text style={styles.itemSubtitle}>2025-12-01 to 2025-12-31</Text>
      </TouchableOpacity>
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
