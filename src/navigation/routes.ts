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

//Home stack
export const HOME_STACK = 'HomeStack';
export const HOME_SCREEN = 'Home';
export const DETAIL_EVENT_SCREEN = 'DetailEvent';
export const NOTIFICATION_SCREEN = 'Notification';
export const PROFILE_OWNER_EVENT_SCREEN = 'ProfileOwnerEvent';
export const SEARCH_SCREEN = 'Search';

//Chat stack
export const CHAT_STACK = 'ChatStack';

//Event stack
export const EVENT_STACK = 'EventStack';
export const EVENTS_SCREEN = 'Events';

//Map stack
export const MAP_STACK = 'MapStack';
export const MAP_SCREEN= 'Map';

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
  // [FILTER_SETTINGS_SCREEN]: {indexTab: number};
};

export type SearchScreenRouteProp = RouteProp<RootStackParamList, 'Search'>;
