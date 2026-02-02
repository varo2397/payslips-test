import { NavigationContainer } from '@react-navigation/native';

import { PayslipsProvider } from '@context/PayslipsContext';
import { RootNavigator } from '@navigation/RootNavigator';

export default function App() {
  return (
    <PayslipsProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PayslipsProvider>
  );
}
