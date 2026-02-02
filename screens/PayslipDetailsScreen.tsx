import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import type { RootStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'PayslipDetails'>;

export function PayslipDetailsScreen({ route }: Props) {
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payslip Details</Text>
      <Text style={styles.label}>ID</Text>
      <Text style={styles.value}>{id}</Text>
      <Text style={styles.label}>Period</Text>
      <Text style={styles.value}>
        {fromDate} to {toDate}
      </Text>
      <Text style={styles.label}>File Type</Text>
      <Text style={styles.value}>{fileType.toUpperCase()}</Text>
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
  label: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 12,
  },
  value: {
    fontSize: 16,
  },
});
