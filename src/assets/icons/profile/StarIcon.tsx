import * as React from 'react';
import {memo} from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg width={19} height={19} fill="none" {...props}>
    <Path
      fill="#FBBE47"
      d="M8.79 3.022a.792.792 0 0 1 1.42 0l1.736 3.517 3.885.568c.649.095.907.893.437 1.35l-2.81 2.737.663 3.866a.792.792 0 0 1-1.148.834L9.5 14.068l-3.472 1.826a.792.792 0 0 1-1.15-.834l.664-3.866-2.81-2.737a.792.792 0 0 1 .438-1.35l3.884-.568L8.79 3.022Z"
    />
  </Svg>
);
const StarIcon = memo(SvgComponent);
export default StarIcon;
