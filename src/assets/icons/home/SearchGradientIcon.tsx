import * as React from 'react';
import {memo} from 'react';
import Svg, {
  Defs,
  LinearGradient,
  Path,
  Stop,
  SvgProps,
} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="url(#a)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M11 19.535a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
    />
    <Path
      stroke="url(#b)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="m21 21.535-4.35-4.35"
      opacity={0.4}
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={11}
        x2={11}
        y1={3.535}
        y2={19.535}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#5669FF" />
        <Stop offset={1} stopColor="#BF56FF" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={18.825}
        x2={18.825}
        y1={17.185}
        y2={21.535}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#5669FF" />
        <Stop offset={1} stopColor="#BF56FF" />
      </LinearGradient>
    </Defs>
  </Svg>
);
const SearchGradientIcon = memo(SvgComponent);
export default SearchGradientIcon;
