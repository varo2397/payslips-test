import { PayslipsProvider } from '@context/PayslipsContext';
import { RootNavigator } from '@navigation/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <PayslipsProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PayslipsProvider>
  );
}
