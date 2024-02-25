import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.055 8.66V6.693a4.172 4.172 0 0 0-4.172-4.171 4.17 4.17 0 0 0-4.19 4.153v1.987"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.376 19.479H7.372a3.476 3.476 0 0 1-3.476-3.476V12.07a3.476 3.476 0 0 1 3.476-3.476h7.004a3.476 3.476 0 0 1 3.476 3.476v3.932a3.476 3.476 0 0 1-3.476 3.476Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10.874 13.02v2.035"
    />
  </Svg>
);
const LockIcon = memo(SvgComponent);
export default LockIcon;
