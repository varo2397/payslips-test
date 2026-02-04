import { List } from '@components/list';
import { usePayslips } from '@context/PayslipsContext';
import type { RootStackParamList } from '@navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';

import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'PayslipList'>;

export function PayslipListScreen({ navigation }: Props) {
  const { visiblePayslips } = usePayslips();

  return (
    <View style={styles.container}>
      <List
        data={visiblePayslips}
        onItemPress={(item) => navigation.push('PayslipDetails', { id: item.id })}
      />
    </View>
  );
}
