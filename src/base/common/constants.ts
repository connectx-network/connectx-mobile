import {Platform} from 'react-native';

export const JWT_KEY = 'accessToken';
export const JWT_REFRESH_KEY = 'refreshToken';
export const POSITION_DATA = 'positionData';

export const IS_IOS = Platform.OS === 'ios';

export const RANDOM_COLORS = [
  '#AFACFF',
  '#FF7171',
  '#DB91FC',
  '#FFACAC',
  '#FFB371',
  '#FFACF2',
  '#FFACE5',
  '#86C7FF',
  '#62B0D9',
  '#ACBFFF',
  '#FF8699',
  '#90E5AA',
  '#CCACFF',
  '#74AEFC',
  '#E0CD7E',
  '#FF8489',
  '#FFA167',
  '#64D0C3',
  '#86B0FF',
  '#D2F8E2',
  '#C69E9E',
  '#FFC68D',
  '#F8D2D2',
  '#E58383',
];

export const CODE_PUSH_KEY_PROP = IS_IOS
  ? 'ePZorrmlaHsTV5XYImDz9lQIuItkdKFMi9Ncv'
  : 'mqS1zqwaBTb7XeLxtiPKV30_kaGAyB5f5UFz5';
