import {useAppState} from '@hooks/useAppState';
import {useOnlineManager} from '@hooks/useOnlineManager';
import {focusManager} from '@tanstack/react-query';
import React, {useCallback} from 'react';
import {AppStateStatus, Text} from 'react-native';

import Styles from '@base/common/styles';
import {persistor, store} from '@redux/stores';
import {PersistQueryClientProvider} from '@twd/react-query/PersistQueryClientProvider';
import {persistOptions, queryClient} from '@twd/react-query/queryClient';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootStack from 'navigation';
import {ToastProvider} from 'react-native-toast-notifications';
import {ToastProps} from 'react-native-toast-notifications/lib/typescript/toast';
import {Icon} from '@assets/icons';
import Color from '@theme/Color';
import {getSize} from '@base/common/responsive';
import Geolocation from '@react-native-community/geolocation';
import ToastNotify from '@components/ToastNotify';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {IS_IOS} from '@base/common/constants';

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

const App = () => {
  useOnlineManager();

  useAppState(onAppStateChange);

  const renderToast = useCallback(
    (toastOptions: ToastProps) => <ToastNotify {...toastOptions} />,
    [],
  );

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={persistOptions}>
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
                <RootStack />
              </ToastProvider>
            </GestureHandlerRootView>
          </PersistQueryClientProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
