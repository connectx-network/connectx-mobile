import {useAppState} from '@hooks/useAppState';
import {useOnlineManager} from '@hooks/useOnlineManager';
import {focusManager} from '@tanstack/react-query';
import React, {useCallback} from 'react';
import {AppStateStatus} from 'react-native';

import {Icon} from '@assets/icons';
import {IS_IOS} from '@base/common/constants';
import {getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import PopupUpdate from '@components/PopupUpdate';
import ToastNotify from '@components/ToastNotify';
import Geolocation from '@react-native-community/geolocation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {persistor, store} from '@redux/stores';
import Color from '@theme/Color';
import {PersistQueryClientProvider} from '@twd/react-query/PersistQueryClientProvider';
import {persistOptions, queryClient} from '@twd/react-query/queryClient';
import RootStack from 'navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ToastProvider} from 'react-native-toast-notifications';
import {ToastProps} from 'react-native-toast-notifications/lib/typescript/toast';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import ColorSchemeProvider from '@theme/ColorSchemeProvider';
import {useColorScheme} from '@theme/useColorScheme';
import {ThemeProvider} from '@shopify/restyle';
import {darkTheme, theme} from '@theme/Theme';

function onAppStateChange(status: AppStateStatus) {
  focusManager.setFocused(status === 'active');
}

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'whenInUse',
  locationProvider: 'auto',
  enableBackgroundLocationUpdates: true,
});

GoogleSignin.configure({
  webClientId: IS_IOS
    ? '276923841290-dr1rs3nqvni4on8bsb8jguq67mq4nnmq.apps.googleusercontent.com'
    : '276923841290-93se9pge3f3k14lsij292cdll1tg60jh.apps.googleusercontent.com',
  iosClientId:
    '276923841290-dr1rs3nqvni4on8bsb8jguq67mq4nnmq.apps.googleusercontent.com',
  scopes: ['email', 'profile'],
  offlineAccess: true,
  forceCodeForRefreshToken: false,
});

const MainAppContent = () => {
  const {colorScheme} = useColorScheme();

  const renderToast = useCallback(
    (toastOptions: ToastProps) => <ToastNotify {...toastOptions} />,
    [],
  );

  return (
    <ThemeProvider theme={colorScheme === 'dark' ? darkTheme : theme}>
      <GestureHandlerRootView style={Styles.root}>
        <ToastProvider
          renderToast={renderToast}
          warningIcon={
            <Icon
              name={'alert-circle-outline'}
              color={Color.RED}
              size={getSize.m(20)}
            />
          }
          successIcon={
            <Icon
              name={'checkmark-circle-outline'}
              color={Color.GREEN_START}
              size={getSize.m(20)}
            />
          }>
          <PopupUpdate>
            <RootStack />
          </PopupUpdate>
        </ToastProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};

const App = () => {
  useOnlineManager();

  useAppState(onAppStateChange);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={persistOptions}>
            <ColorSchemeProvider>
              <MainAppContent />
            </ColorSchemeProvider>
          </PersistQueryClientProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
