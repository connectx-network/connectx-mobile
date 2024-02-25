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
      d="m15.829 8.306-3.91 3.148c-.74.58-1.777.58-2.517 0L5.458 8.306"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.314 3.208h8.642a4.544 4.544 0 0 1 3.282 1.458 4.599 4.599 0 0 1 1.215 3.395v5.984a4.599 4.599 0 0 1-1.215 3.396 4.543 4.543 0 0 1-3.282 1.457H6.314c-2.677 0-4.48-2.177-4.48-4.853V8.061c0-2.675 1.803-4.853 4.48-4.853Z"
      clipRule="evenodd"
    />
  </Svg>
);
const MailIcon = memo(SvgComponent);
export default MailIcon;
