import * as React from 'react';
import {memo} from 'react';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={props.color || '#1F1212'}
        d="M10.247 6.015v14.743a5.26 5.26 0 0 0-3.551-1.375 5.288 5.288 0 0 0-5.282 5.281 5.288 5.288 0 0 0 5.282 5.282 5.288 5.288 0 0 0 5.281-5.27V14.14l15.169-4.559v7.622a5.262 5.262 0 0 0-3.55-1.375 5.288 5.288 0 0 0-5.283 5.282 5.288 5.288 0 0 0 5.282 5.282 5.288 5.288 0 0 0 5.282-5.253V.416l-18.63 5.599Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={props.color || '#1F1212'} d="M.376.474h29.53v29.53H.376z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const MusicIcon = memo(SvgComponent);
export default MusicIcon;
