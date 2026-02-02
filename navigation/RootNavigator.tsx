import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PayslipDetailsScreen } from '@screens/PayslipDetailsScreen';
import { PayslipListScreen } from '@screens/PayslipListScreen';
import type { RootStackParamList } from '@navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="PayslipList">
      <Stack.Screen
        name="PayslipList"
        component={PayslipListScreen}
        options={{ title: 'Payslips' }}
      />
      <Stack.Screen
        name="PayslipDetails"
        component={PayslipDetailsScreen}
        options={{ title: 'Payslip Details' }}
      />
    </Stack.Navigator>
  );
}
