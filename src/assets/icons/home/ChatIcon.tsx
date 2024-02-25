import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={22} fill="none" {...props}>
    <Path
      fill={props.color || '#fff'}
      d="M0 0v13.125L2.625 10.5H5.25V2.625h7.875V0H0Zm7.875 5.25v10.5h10.5L21 18.375V5.25H7.875Z"
    />
  </Svg>
);
const ChatIcon = memo(SvgComponent);
export default ChatIcon;
