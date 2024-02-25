import * as React from 'react';
import {memo} from 'react';
import Svg, {Path, Rect, SvgProps} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={31} height={31} fill="none" {...props}>
    <Rect width={30.755} height={30.755} fill="#1977F3" rx={15.378} />
    <Path
      fill="#1F1212"
      fillRule="evenodd"
      d="M18.097 30.515a15.468 15.468 0 0 1-5.136.05v-10.29H8.788v-4.734h4.173v-3.61c0-4.104 2.452-6.372 6.207-6.372a25.36 25.36 0 0 1 3.68.32v4.032h-2.075c-2.04 0-2.676 1.262-2.676 2.559v3.071h4.558l-.729 4.735h-3.83v10.24Z"
      clipRule="evenodd"
    />
  </Svg>
);
const FacebookIcon = memo(SvgComponent);
export default FacebookIcon;
