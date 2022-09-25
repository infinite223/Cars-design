import { NavigationContainer } from '@react-navigation/native';
import tw from 'tailwindcss-react-native'
import 'react-native-gesture-handler';
import { AuthProvider } from './hooks/useAuth';
import StackNavigator from './StackNavigator';
import { Provider } from 'react-redux';
import { LogBox, StatusBar } from 'react-native';
import { store } from './store';
import { selectTheme } from './slices/themeSlice';

LogBox.ignoreAllLogs()

export default function App() {
  // const theme = useSelector(selectTheme)
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
