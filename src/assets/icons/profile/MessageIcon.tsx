import * as React from 'react';
import {memo} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={22} fill="none" {...props}>
    <Path
      stroke="#5669FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.25 10.542a7.68 7.68 0 0 1-.825 3.483 7.792 7.792 0 0 1-6.967 4.308 7.684 7.684 0 0 1-3.483-.825L2.75 19.25l1.742-5.225a7.681 7.681 0 0 1-.825-3.483 7.792 7.792 0 0 1 4.308-6.967 7.682 7.682 0 0 1 3.483-.825h.459a7.773 7.773 0 0 1 7.333 7.333v.459Z"
    />
  </Svg>
);
const MessageIcon = memo(SvgComponent);
export default MessageIcon;
