import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg width={14} height={14} fill="none" {...props}>
    <Path
      stroke="#5669FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.5 10.833h4.875M8.938 1.896a1.15 1.15 0 0 1 1.624 1.625l-6.77 6.77-2.167.542.542-2.166 6.77-6.771Z"
    />
  </Svg>
);
const PenIcon = memo(SvgComponent);
export default PenIcon;
