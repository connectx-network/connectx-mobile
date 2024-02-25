import * as React from 'react';
import {memo} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={22} fill="none" {...props}>
    <Path
      stroke="#1F1212"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.667 19.25v-1.833A3.667 3.667 0 0 0 11 13.75H4.583a3.667 3.667 0 0 0-3.666 3.667v1.833M7.792 10.083a3.667 3.667 0 1 0 0-7.333 3.667 3.667 0 0 0 0 7.333ZM18.333 7.333v5.5M21.083 10.083h-5.5"
    />
  </Svg>
);
const UserPlusIcon = memo(SvgComponent);
export default UserPlusIcon;
