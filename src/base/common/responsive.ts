import {Dimensions} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export const WIDTH_SCREEN = Dimensions.get('window').width;
export const HEIGHT_SCREEN = Dimensions.get('window').height;

export const getSize = {
  m: moderateScale,
  s: scale,
  v: verticalScale,
};
