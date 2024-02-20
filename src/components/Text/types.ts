import Font from '@theme/Font';
import {StyleProp, TextProps, TextStyle} from 'react-native';

export interface ITypography extends TextProps {
  flex?: boolean;
  customsFlex?: number;
  flexShrink?: boolean;
  flexGrow?: boolean;
  fontType?: string;
  size?: number;
  color?: string;
  center?: boolean;
  right?: boolean;
  justify?: boolean;
  padding?: number;
  margin?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  style?: StyleProp<TextStyle>;
  lineHeight?: number;
  animated?: boolean;
  ref?: any;
  children?: any;
  fontFamily?: string;
  customFont?: keyof typeof Font;
}
