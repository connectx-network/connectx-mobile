import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React, {FC, memo, useCallback, useLayoutEffect, useRef} from 'react';
import DrawerContent from './DrawerContent';
import NavigationService from './navigationService';
import {
  DRAWER_STACK,
  LOGIN_SCREEN,
  MAIN_STACK,
  RootStackParamList,
} from './routes';
import LoginScreen from '@screens/auth/login';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const MainStackComponent = memo(() => (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName={LOGIN_SCREEN}>
    <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
  </Stack.Navigator>
));

// const AuctionResultsStack = memo(() => {
//   return (
//     <Stack.Navigator
//       initialRouteName={AUCTION_RESULTS_SCREEN}
//       screenOptions={{headerShown: false}}>
//       <Stack.Screen
//         name={AUCTION_RESULTS_SCREEN}
//         component={AuctionResultsScreen}
//       />
//     </Stack.Navigator>
//   );
// });

// const ComingAuctionStack = memo(() => {
//   return (
//     <Stack.Navigator
//       initialRouteName={AUCTION_RESULTS_SCREEN}
//       screenOptions={{headerShown: false}}>
//       <Stack.Screen
//         name={COMING_AUCTION_SCREEN}
//         component={ComingAuctionScreen}
//       />
//       <Stack.Screen name={DETAIL_NEWS_SCREEN} component={DetailNewsScreen} />
//     </Stack.Navigator>
//   );
// });

// const NotifyAuctionStack = memo(() => {
//   return (
//     <Stack.Navigator
//       screenOptions={{headerShown: false}}
//       initialRouteName={NOTIFY_AUCTION_SCREEN}>
//       <Stack.Screen
//         name={NOTIFY_AUCTION_SCREEN}
//         component={NotifyAuctionScreen}
//       />
//       <Stack.Group screenOptions={{presentation: 'modal'}}>
//         <Stack.Screen name={MODAL_PDF_SCREEN} component={ModalPdfScreen} />
//       </Stack.Group>
//     </Stack.Navigator>
//   );
// });

const DrawerStack = memo(() => {
  const drawerContent = useCallback(
    (props: DrawerContentComponentProps) => <DrawerContent {...props} />,
    [],
  );
  return (
    <Drawer.Navigator
      drawerContent={drawerContent}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStatusBarAnimation: 'fade',
      }}
      initialRouteName={MAIN_STACK}>
      <Drawer.Screen name={MAIN_STACK} component={MainStackComponent} />
      {/* <Drawer.Screen
        name={COMING_AUCTION_STACK}
        component={ComingAuctionStack}
      />
      <Drawer.Screen
        name={AUCTION_RESULTS_STACK}
        component={AuctionResultsStack}
      />
      <Drawer.Screen
        name={NOTIFY_AUCTION_STACK}
        component={NotifyAuctionStack}
      /> */}
    </Drawer.Navigator>
  );
});

const RootStack: FC<{}> = () => {
  const navigationRef = useRef<NavigationContainerRef<{}>>();
  const routeNameRef = useRef<string>();

  // useLayoutEffect(() => {
  //   BootSplash.hide();
  // }, []);

  const ref = useCallback((refNavigation: any) => {
    navigationRef.current = refNavigation;
    NavigationService.setTopLevelNavigator(refNavigation);
  }, []);

  const onReady = useCallback(() => {
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
  }, []);

  return (
    <NavigationContainer
      onReady={onReady}
      // onStateChange={onStateChange}
      // linking={linking}
      ref={ref}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          orientation: 'portrait',
          animation: 'slide_from_right',
        }}
        initialRouteName={LOGIN_SCREEN}>
        <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={DRAWER_STACK} component={DrawerStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(RootStack);
