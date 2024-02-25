import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      fill="#EB5757"
      fillRule="evenodd"
      stroke="#EB5757"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m7.76 12.547-4.626 2.366c-.369.18-.824.053-1.027-.286a.72.72 0 0 1-.093-.34V3.8c0-2 1.463-2.8 3.568-2.8h4.946c2.042 0 3.569.747 3.569 2.667v10.62c0 .189-.08.37-.224.504a.792.792 0 0 1-.54.209.89.89 0 0 1-.37-.087l-4.654-2.366a.614.614 0 0 0-.55 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
const SavedActiveIcon = memo(SvgComponent);
export default SavedActiveIcon;
