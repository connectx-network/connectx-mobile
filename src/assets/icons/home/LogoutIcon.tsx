import * as React from 'react';
import {memo} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke={props.color || '#767676'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.625 7.906V6.11a1.797 1.797 0 0 1 1.797-1.796h7.187a1.797 1.797 0 0 1 1.797 1.796v10.782a1.797 1.797 0 0 1-1.797 1.797h-6.828c-.992 0-2.156-.805-2.156-1.797v-1.797"
    />
    <Path
      stroke={props.color || '#767676'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.938 15.094 16.53 11.5l-3.593-3.594M3.594 11.5h12.219"
    />
  </Svg>
);
const LogoutIcon = memo(SvgComponent);
export default LogoutIcon;
