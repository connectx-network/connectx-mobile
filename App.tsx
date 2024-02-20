import {useAppState} from '@hooks/useAppState';
import {useOnlineManager} from '@hooks/useOnlineManager';
import {focusManager} from '@tanstack/react-query';
import React from 'react';
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

function onAppStateChange(status: AppStateStatus) {
  focusManager.setFocused(status === 'active');
}

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
            <GestureHandlerRootView style={Styles.root}>
              <RootStack />
            </GestureHandlerRootView>
          </PersistQueryClientProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
