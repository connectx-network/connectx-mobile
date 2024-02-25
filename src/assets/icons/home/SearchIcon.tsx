import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke={props.color || '#1F1212'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
    />
    <Path
      stroke={props.color || '#1F1212'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="m21 21-4.35-4.35"
      opacity={0.4}
    />
  </Svg>
);
const SearchIcon = memo(SvgComponent);
export default SearchIcon;
