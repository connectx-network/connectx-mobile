import * as React from 'react';
import {memo} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M10.665 3.671a8.612 8.612 0 0 1 8.793.073c2.679 1.665 4.307 4.636 4.292 7.833-.063 3.175-1.808 6.16-3.99 8.468a23.404 23.404 0 0 1-4.199 3.525 1.47 1.47 0 0 1-.51.18 1.025 1.025 0 0 1-.488-.148 23.146 23.146 0 0 1-6.048-5.684 11.6 11.6 0 0 1-2.265-6.5c-.002-3.203 1.683-6.16 4.415-7.747Zm1.578 9.072a2.972 2.972 0 0 0 2.746 1.872 2.924 2.924 0 0 0 2.104-.877c.559-.567.871-1.337.869-2.14a3.029 3.029 0 0 0-1.828-2.805 2.932 2.932 0 0 0-3.242.65 3.069 3.069 0 0 0-.65 3.3Z"
      clipRule="evenodd"
    />
    <Path
      fill="#fff"
      d="M15 27.5c3.452 0 6.25-.56 6.25-1.25S18.452 25 15 25s-6.25.56-6.25 1.25S11.548 27.5 15 27.5Z"
      opacity={0.4}
    />
  </Svg>
);
const LocationIcon = memo(SvgComponent);
export default LocationIcon;
