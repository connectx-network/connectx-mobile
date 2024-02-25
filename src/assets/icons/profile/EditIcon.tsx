import * as React from 'react';
import {memo} from 'react';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G
      stroke="#5669FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#a)">
      <Path d="M10.084 3.667H3.667A1.833 1.833 0 0 0 1.834 5.5v12.833a1.833 1.833 0 0 0 1.833 1.834H16.5a1.833 1.833 0 0 0 1.834-1.834v-6.416" />
      <Path d="M16.959 2.292a1.945 1.945 0 0 1 2.75 2.75L11 13.75l-3.667.917L8.25 11l8.709-8.708Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h22v22H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
const EditIcon = memo(SvgComponent);
export default EditIcon;
