import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={26} fill="none" {...props}>
    <Path
      fill="#E43E2B"
      d="M13 5.027a7.205 7.205 0 0 1 5.027 1.936l3.668-3.587A12.49 12.49 0 0 0 13.001.001 12.99 12.99 0 0 0 1.386 7.166L5.59 10.43A7.858 7.858 0 0 1 13 5.027Z"
    />
    <Path
      fill="#3B7DED"
      d="M25.48 13.29a11.136 11.136 0 0 0-.275-2.657H13v4.825h7.165a6.354 6.354 0 0 1-2.659 4.217l4.103 3.178a12.709 12.709 0 0 0 3.875-9.563h-.004Z"
    />
    <Path
      fill="#F0B501"
      d="M5.605 15.572A8 8 0 0 1 5.172 13a8.41 8.41 0 0 1 .418-2.57L1.387 7.164a12.972 12.972 0 0 0 0 11.672l4.218-3.265Z"
    />
    <Path
      fill="#2BA24C"
      d="M13 26a12.39 12.39 0 0 0 8.61-3.148l-4.103-3.178a7.694 7.694 0 0 1-4.507 1.3 7.827 7.827 0 0 1-7.395-5.402l-4.203 3.265A12.97 12.97 0 0 0 13 26.001Z"
    />
  </Svg>
);
const GoogleIcon = memo(SvgComponent);
export default GoogleIcon;
