import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke={props.color || '#767676'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.167 20.125v-1.917a3.833 3.833 0 0 0-3.834-3.833H7.667a3.833 3.833 0 0 0-3.834 3.833v1.917M11.5 10.542a3.833 3.833 0 1 0 0-7.667 3.833 3.833 0 0 0 0 7.667Z"
    />
  </Svg>
);
const ProfileIcon = memo(SvgComponent);
export default ProfileIcon;
