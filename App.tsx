import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { AuthProvider } from './hooks/useAuth';
import StackNavigator from './navigation/StackNavigator';
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import { store } from './store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RightNavigation } from './navigation/RightNavigation';
import { MenuProvider } from 'react-native-popup-menu';
import PrompttModal from './screens/modals/ProptModal';
import UploadingStatus from './components/UploadingStatus';

LogBox.ignoreAllLogs()

export default function App() {

  return (   
    <Provider store={store}>
      <MenuProvider>
        <NavigationContainer>
          <AuthProvider>
            <GestureHandlerRootView style={{flex:1}}>
              <RightNavigation/>
              <UploadingStatus/>
              <PrompttModal/>
              <StackNavigator/>
            </GestureHandlerRootView>
          </AuthProvider>
        </NavigationContainer>
      </MenuProvider>
    </Provider>
  );
}
