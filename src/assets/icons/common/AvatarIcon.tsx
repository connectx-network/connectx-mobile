import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#1F1212"
      d="M10.768 0C7.807 0 5.384 3.015 5.384 6.73c0 3.715 2.423 6.73 5.384 6.73 2.96 0 5.384-3.015 5.384-6.73 0-3.715-2.423-6.73-5.384-6.73ZM5.142 13.46A5.39 5.39 0 0 0 0 18.844v2.691h21.535v-2.691a5.37 5.37 0 0 0-5.141-5.384c-1.454 1.642-3.446 2.692-5.626 2.692s-4.173-1.05-5.626-2.692Z"
    />
  </Svg>
);
const AvatarIcon = memo(SvgComponent);
export default AvatarIcon;
