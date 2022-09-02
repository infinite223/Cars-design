import { NavigationContainer } from '@react-navigation/native';
import tw from 'tailwindcss-react-native'
import { AuthProvider } from './hooks/useAuth';
import StackNavigator from './StackNavigator';
import { registerRootComponent } from 'expo';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator/>
      </AuthProvider>
    </NavigationContainer>
  );
}

registerRootComponent(App);
