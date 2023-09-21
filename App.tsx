import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { AuthProvider } from './hooks/useAuth';
import StackNavigator from './navigation/StackNavigator';
import { Provider } from 'react-redux';
import { Linking, LogBox } from 'react-native';
import { store } from './store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RightNavigation } from './navigation/RightNavigation';
import { MenuProvider } from 'react-native-popup-menu';
import PrompttModal from './screens/modals/ProptModal';
import UploadingStatus from './components/UploadingStatus';
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
          // Configuration for linking
          screens:{},
          
        },
        async getInitialURL() {
          // First, you may want to do the default deep link handling
          // Check if app was opened from a deep link
          const url = await Linking.getInitialURL();

          if (url != null) {
            return url;
          }

          // Handle URL from expo push notifications
          const response = await Notifications.getLastNotificationResponseAsync();

          return response?.notification.request.content.data.url;
        },
        subscribe(listener) {
          const onReceiveURL = ({ url }: { url: string }) => listener(url);

          // Listen to incoming links from deep linking
          const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);

          // Listen to expo push notifications
          const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            const url = response.notification.request.content.data.url;

            // Any custom logic to see whether the URL needs to be handled
            //...

            // Let React Navigation handle the URL
            listener(url);
          });

          return () => {
            // Clean up the event listeners
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
