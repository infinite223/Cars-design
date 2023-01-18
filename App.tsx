import { NavigationContainer } from '@react-navigation/native';
import tw from 'tailwindcss-react-native'
import 'react-native-gesture-handler';
import { AuthProvider } from './hooks/useAuth';
import StackNavigator from './navigation/StackNavigator';
import { Provider } from 'react-redux';
import { LogBox, StatusBar } from 'react-native';
import { store } from './store';
import { selectTheme } from './slices/themeSlice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RightNavigation } from './navigation/RightNavigation';
import { MenuProvider } from 'react-native-popup-menu';
import PrompttModal from './screens/modals/ProptModal';
import UploadingStatus from './components/UploadingStatus';
import { Appearance, useColorScheme } from 'react-native';


LogBox.ignoreAllLogs()

export default function App() {
  let colorScheme = useColorScheme();
  console.log(colorScheme)
  
  return (   
    <Provider store={store}>
      <MenuProvider>
        <NavigationContainer>
          <AuthProvider>
            <GestureHandlerRootView style={{flex:1}}>
              {/* <StatusBar showHideTransition={'slide'} hidden={false}/> */}
              <UploadingStatus/>
              <PrompttModal/>
              <StackNavigator/>
              <RightNavigation/>
            </GestureHandlerRootView>
          </AuthProvider>
        </NavigationContainer>
      </MenuProvider>
    </Provider>
  );
}
