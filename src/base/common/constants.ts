import {Platform} from 'react-native';

export const JWT_KEY = 'accessToken';
export const JWT_REFRESH_KEY = 'refreshToken';

export const IS_IOS = Platform.OS === 'ios';
