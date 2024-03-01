import * as React from 'react';
import {memo} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path fill="#fff" d="M19 10h-2V7h-3V5h3V2h2v3h3v2h-3v3Z" />
    <Path
      fill="#fff"
      d="M21 12h-2v3H8.334a1.984 1.984 0 0 0-1.2.4L5 17V5h7V3H5a2 2 0 0 0-2 2v16l4.8-3.6c.346-.26.767-.4 1.2-.4h10a2 2 0 0 0 2-2v-3Z"
    />
  </Svg>
);
const MessagePlusIcon = memo(SvgComponent);
export default MessagePlusIcon;
