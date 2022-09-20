import { NavigationContainer } from '@react-navigation/native';
import tw from 'tailwindcss-react-native'
import 'react-native-gesture-handler';
import { AuthProvider } from './hooks/useAuth';
import StackNavigator from './StackNavigator';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import { store } from './store';

LogBox.ignoreAllLogs()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthProvider>
          <StackNavigator/>
        </AuthProvider>
      </NavigationContainer>
    </Provider>
  );
}
