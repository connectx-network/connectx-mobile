import React from 'react';

export const DRAWER_STACK = 'DrawerStack';
export const MAIN_STACK = 'MainStack';
export const LOGIN_SCREEN = 'Login';

export const navigationRef = React.createRef<any>();

export type RootStackParamList = {
  [key: string]: any;
  [DRAWER_STACK]: {};
  [MAIN_STACK]: {};
  // [FILTER_SETTINGS_SCREEN]: {indexTab: number};
};

// export type FilterSettingsScreenRouteProp = RouteProp<
//   RootStackParamList,
//   'FilterSettings'
// >;
