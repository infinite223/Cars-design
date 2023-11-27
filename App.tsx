import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { AuthProvider } from './src/hooks/useAuth';
import StackNavigator from './src/navigation/StackNavigator';
import { Provider } from 'react-redux';
import { Linking, LogBox } from 'react-native';
import { store } from './src/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RightNavigation } from './src/navigation/RightNavigation';
import { MenuProvider } from 'react-native-popup-menu';
import PrompttModal from './src/screens/modals/ProptModal';
import UploadingStatus from './src/components/UploadingStatus';
import { StatusBar } from 'react-native';
import * as Notifications from 'expo-notifications';
LogBox.ignoreAllLogs()

export default function App() {

  return (   
    <Provider store={store}>
      <MenuProvider>
      <NavigationContainer
      linking={{
        prefixes:[],
        config: {
          screens:{},
        },
        async getInitialURL() {
          const url = await Linking.getInitialURL();

          if (url != null) {
            return url;
          }

          const response = await Notifications.getLastNotificationResponseAsync();

          return response?.notification.request.content.data.url;
        },
        subscribe(listener) {
          const onReceiveURL = ({ url }: { url: string }) => listener(url);

          const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);

          const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            const url = response.notification.request.content.data.url;
            listener(url);
          });

          return () => {
            eventListenerSubscription.remove();
            subscription.remove();
          };
        },
      }}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
        />
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
