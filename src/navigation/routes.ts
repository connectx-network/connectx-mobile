import {Event} from '@model/event';
import {RouteProp} from '@react-navigation/native';
import React from 'react';

export const DRAWER_STACK = 'DrawerStack';
export const TAB_NAVIGATOR = 'TabNavigator';
export const MAIN_STACK = 'MainStack';

//Auth
export const LOGIN_SCREEN = 'Login';
export const REGISTER_SCREEN = 'Register';
export const VERIFY_OTP_SCREEN = 'VerifyOtp';
export const FORGOT_PASSWORD_SCREEN = 'ForgotPassword';
export const RESET_PASSWORD_SCREEN = 'ResetPassword';

//Home stack
export const HOME_STACK = 'HomeStack';
export const HOME_SCREEN = 'Home';
export const DETAIL_EVENT_SCREEN = 'DetailEvent';
export const NOTIFICATION_SCREEN = 'Notification';
export const PROFILE_OWNER_EVENT_SCREEN = 'ProfileOwnerEvent';
export const SEARCH_SCREEN = 'Search';

//Chat stack
export const CHAT_STACK = 'ChatStack';
export const CHAT_SCREEN = 'Chat';
export const BUBBLE_CHAT_SCREEN = 'BubbleChat';

//Event stack
export const EVENT_STACK = 'EventStack';
export const EVENTS_SCREEN = 'Events';
export const SCAN_QR_SCREEN = 'ScanQr';
export const CONFIRM_INFO_USER_SCREEN = 'ConfirmInfoUser';

//Map stack
export const MAP_STACK = 'MapStack';
export const MAP_SCREEN = 'Map';

//Community stack
export const COMMUNITY_STACK = 'CommunityStack';

//Bottom sheet stack
export const BS_STACK = 'BSStack';
export const BS_FILTER = 'BSFilter';

//Profile
export const PROFILE_STACK = 'ProfileStack';
export const PROFILE_SCREEN = 'Profile';
export const EDIT_PROFILE_SCREEN = 'EditProfile';

export const navigationRef = React.createRef<any>();

export type RootStackParamList = {
  [key: string]: any;
  [DRAWER_STACK]: {};
  [MAIN_STACK]: {};
  [SEARCH_SCREEN]: {heightSearch: number; heightTabBar: number};
  [VERIFY_OTP_SCREEN]: {email: string; isResetPassword?: boolean};
  [DETAIL_EVENT_SCREEN]: Event;
  [RESET_PASSWORD_SCREEN]: {email: string; otp: string};
  [PROFILE_SCREEN]: {id?: string};
  [PROFILE_OWNER_EVENT_SCREEN]: {id?: string};
  [EDIT_PROFILE_SCREEN]: {refetch?: () => void};
  [CONFIRM_INFO_USER_SCREEN]: {eventId: string; userId: string};
};

export type SearchScreenRouteProp = RouteProp<RootStackParamList, 'Search'>;
export type VerifyOTPScreenRouteProp = RouteProp<
  RootStackParamList,
  'VerifyOtp'
>;
export type DetailEventScreenRouteProp = RouteProp<
  RootStackParamList,
  'DetailEvent'
>;
export type ResetPasswordScreenRouteProp = RouteProp<
  RootStackParamList,
  'ResetPassword'
>;
export type ProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  'Profile' | 'ProfileOwnerEvent'
>;

export type EditProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  'EditProfile'
>;
export type ConfirmInfoUserScreenRouteProp = RouteProp<
  RootStackParamList,
  'ConfirmInfoUser'
>;

export const linking = {
  prefixes: ['connectx.network://', 'https://connectx.network/'],
  config: {
    screens: {
      [PROFILE_OWNER_EVENT_SCREEN]: 'events/:id',
    },
  },
};
