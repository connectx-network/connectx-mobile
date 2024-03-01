import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#fff"
      d="m15 19.411-2.7-2.7 1.414-1.416L15 16.583l5.008-5L21.419 13 15 19.41v.001ZM11 17H2v-2h9v2Zm4-4H2v-2h13v2Zm0-4H2V7h13v2Z"
    />
  </Svg>
);
const ContactIcon = memo(SvgComponent);
export default ContactIcon;
