import { List } from '@components/list';
import { usePayslips } from '@context/PayslipsContext';
import type { RootStackParamList } from '@navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'PayslipList'>;

export function PayslipListScreen({ navigation }: Props) {
  const { visiblePayslips, sortOrder, setSortOrder } = usePayslips();

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Sort by</Text>
        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              styles.filterButtonSpacing,
              sortOrder === 'recent' && styles.filterButtonActive,
            ]}
            onPress={() => setSortOrder('recent')}
          >
            <Text
              style={[
                styles.filterButtonText,
                sortOrder === 'recent' && styles.filterButtonTextActive,
              ]}
            >
              Most recent
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, sortOrder === 'oldest' && styles.filterButtonActive]}
            onPress={() => setSortOrder('oldest')}
          >
            <Text
              style={[
                styles.filterButtonText,
                sortOrder === 'oldest' && styles.filterButtonTextActive,
              ]}
            >
              Oldest
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <List
        data={visiblePayslips}
        onItemPress={(item) => navigation.push('PayslipDetails', { id: item.id })}
      />
    </View>
  );
}
