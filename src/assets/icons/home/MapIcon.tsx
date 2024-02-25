import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill={props.color || '#fff'}
      fillRule="evenodd"
      d="M11.529 1.917a8.187 8.187 0 0 1 5.75 2.386 8.048 8.048 0 0 1 2.367 5.721v.048c-.058 2.904-1.687 5.578-3.718 7.667a21.193 21.193 0 0 1-3.815 3.105 1 1 0 0 1-1.293 0 21.084 21.084 0 0 1-5.357-4.993 10.357 10.357 0 0 1-2.109-5.894c.02-4.456 3.68-8.05 8.175-8.04Zm0 10.79c.68 0 1.332-.258 1.811-.728.498-.489.777-1.14.777-1.82 0-1.419-1.16-2.56-2.588-2.56a2.562 2.562 0 0 0-2.578 2.56c0 1.4 1.13 2.53 2.55 2.548h.028Z"
      clipRule="evenodd"
    />
  </Svg>
);
const MapIcon = memo(SvgComponent);
export default MapIcon;
