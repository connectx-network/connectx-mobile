import {
  DrawerContentComponentProps,
  createDrawerNavigator,
  useDrawerProgress,
} from '@react-navigation/drawer';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {WIDTH_SCREEN} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {Block} from '@components';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {TransitionSpec} from '@react-navigation/stack/lib/typescript/src/types';
import LoginScreen from '@screens/auth/login';
import ForgotPasswordScreen from '@screens/auth/login/ForgotPasswordScreen';
import RegisterScreen from '@screens/auth/register';
import VerifyOtpScreen from '@screens/auth/register/VerifyOtpScreen';
import DetailEventScreen from '@screens/detailEvent';
import EventsScreen from '@screens/events';
import BSFilter, {bottomSheetFilterRef} from '@screens/filter';
import HomeScreen from '@screens/home';
import SearchScreen from '@screens/home/SearchScreen';
import NotificationScreen from '@screens/notification';
import ProfileScreen from '@screens/profile';
import Color from '@theme/Color';
import React, {FC, memo, useCallback, useRef} from 'react';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import BottomTabCustom from './BottomTabsCustom';
import DrawerContent from './DrawerContent';
import NavigationService from './navigationService';
import {
  CHAT_STACK,
  COMMUNITY_STACK,
  DETAIL_EVENT_SCREEN,
  DRAWER_STACK,
  EDIT_PROFILE_SCREEN,
  EVENTS_SCREEN,
  EVENT_STACK,
  FORGOT_PASSWORD_SCREEN,
  HOME_SCREEN,
  HOME_STACK,
  LOGIN_SCREEN,
  MAIN_STACK,
  MAP_SCREEN,
  MAP_STACK,
  NOTIFICATION_SCREEN,
  PROFILE_OWNER_EVENT_SCREEN,
  PROFILE_SCREEN,
  PROFILE_STACK,
  REGISTER_SCREEN,
  RESET_PASSWORD_SCREEN,
  RootStackParamList,
  SEARCH_SCREEN,
  TAB_NAVIGATOR,
  VERIFY_OTP_SCREEN,
} from './routes';
import EditProfileScreen from '@screens/profile/EditProfileScreen';
import MapScreen from '@screens/map';
import {useSelector} from 'react-redux';
import {IRootState} from '@redux/stores';
import {UserState} from '@redux/slices/userSlice';
import {uStateUser} from '@redux/stores/selection';
import ResetPasswordScreen from '@screens/auth/login/ResetPasswordScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const ShareStack = createSharedElementStackNavigator();

const iosTransitionSpec: TransitionSpec = {
  animation: 'timing',
  config: {
    duration: 150,
  },
};

const HomeStack = memo(() => {
  return (
    <ShareStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardOverlayEnabled: true,
        cardStyle: {backgroundColor: Color.TRANSPARENT},
        transitionSpec: {
          open: iosTransitionSpec,
          close: iosTransitionSpec,
        },
      }}
      initialRouteName={HOME_SCREEN}>
      <ShareStack.Screen
        name={HOME_SCREEN}
        options={{
          animationEnabled: false,
        }}
        component={HomeScreen}
      />
      <ShareStack.Screen
        name={SEARCH_SCREEN}
        component={SearchScreen}
        options={{
          presentation: 'transparentModal',
          transitionSpec: {
            open: iosTransitionSpec,
            close: iosTransitionSpec,
          },
        }}
        sharedElements={route => {
          return [
            {
              animation: 'fade',
              resize: 'auto',
              align: 'auto',
              id: 'search',
            },
          ];
        }}
      />
    </ShareStack.Navigator>
  );
});

const EventsStack = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={EVENTS_SCREEN}>
      <Stack.Screen name={EVENTS_SCREEN} component={EventsScreen} />
    </Stack.Navigator>
  );
});

const MapStack = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={MAP_SCREEN}>
      <Stack.Screen name={MAP_SCREEN} component={MapScreen} />
    </Stack.Navigator>
  );
});

const ProfileStack = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={PROFILE_SCREEN}>
      <Stack.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
      <Stack.Screen name={EDIT_PROFILE_SCREEN} component={EditProfileScreen} />
    </Stack.Navigator>
  );
});

const tabCustom = (props: BottomTabBarProps) => <BottomTabCustom {...props} />;

const TabsNavigator = memo(() => {
  return (
    <Tab.Navigator
      tabBar={tabCustom}
      initialRouteName={HOME_STACK}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name={CHAT_STACK}
        component={LoginScreen}
        initialParams={{
          name: 'Chat',
        }}
      />
      <Tab.Screen
        name={EVENT_STACK}
        component={EventsStack}
        initialParams={{
          name: 'Events',
        }}
      />
      <Tab.Screen
        name={HOME_STACK}
        component={HomeStack}
        initialParams={{
          icon: '-icon-_home',
        }}
      />
      <Tab.Screen
        name={MAP_STACK}
        component={MapStack}
        initialParams={{
          name: 'Map',
        }}
      />
      <Tab.Screen
        name={COMMUNITY_STACK}
        component={ForgotPasswordScreen}
        initialParams={{
          name: 'Community',
        }}
      />
    </Tab.Navigator>
  );
});

const MainStack = memo(() => {
  const progress: any = useDrawerProgress();

  const stylesDrawer = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [1, 0.8]);
    return {
      transform: [{scale}],
    };
  }, []);

  return (
    <Block style={Styles.container}>
      <Animated.View style={[Styles.root, stylesDrawer]}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={TAB_NAVIGATOR}>
          <Stack.Screen name={TAB_NAVIGATOR} component={TabsNavigator} />
          <Stack.Screen
            name={DETAIL_EVENT_SCREEN}
            component={DetailEventScreen}
          />
          <Stack.Screen
            name={NOTIFICATION_SCREEN}
            component={NotificationScreen}
          />
          <Stack.Screen
            name={PROFILE_OWNER_EVENT_SCREEN}
            component={ProfileScreen}
          />
        </Stack.Navigator>
        <BSFilter ref={bottomSheetFilterRef} />
      </Animated.View>
    </Block>
  );
});

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
        drawerPosition: 'left',
        drawerStatusBarAnimation: 'none',
        overlayColor: Color.TRANSPARENT,
        drawerStyle: {
          width: WIDTH_SCREEN * 0.6,
        },
      }}
      initialRouteName={MAIN_STACK}>
      <Drawer.Screen name={MAIN_STACK} component={MainStack} />
      <Drawer.Screen name={PROFILE_STACK} component={ProfileStack} />
    </Drawer.Navigator>
  );
});

const RootStack: FC<{}> = () => {
  const navigationRef = useRef<NavigationContainerRef<{}>>();
  const routeNameRef = useRef<string>();
  const {isLogged} = useSelector<IRootState, UserState>(uStateUser);

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
        initialRouteName={isLogged ? DRAWER_STACK : LOGIN_SCREEN}>
        <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={REGISTER_SCREEN} component={RegisterScreen} />
        <Stack.Screen name={VERIFY_OTP_SCREEN} component={VerifyOtpScreen} />
        <Stack.Screen
          name={FORGOT_PASSWORD_SCREEN}
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name={RESET_PASSWORD_SCREEN}
          component={ResetPasswordScreen}
        />
        <Stack.Screen name={DRAWER_STACK} component={DrawerStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(RootStack);
