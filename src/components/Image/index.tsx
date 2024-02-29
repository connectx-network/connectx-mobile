import {getSize} from '@base/common/responsive';
import React, {memo} from 'react';

import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {TImage} from './types';

const Image = ({
  source,
  width,
  height,
  padding,
  margin,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  paddingVertical,
  paddingHorizontal,
  marginVertical,
  marginHorizontal,
  borderRadius,
  style,
  resizeMode = 'cover',
  tintColor,
  onLoadEnd,
  ...rest
}: TImage) => {
  const imageStyle = StyleSheet.flatten([
    width && {width: getSize.m(width)},
    height && {height: getSize.m(height)},
    padding && {padding: getSize.m(padding)},
    margin && {margin: getSize.m(margin)},
    paddingTop && {paddingTop: getSize.m(paddingTop)},
    paddingBottom && {paddingBottom: getSize.m(paddingBottom)},
    paddingLeft && {paddingLeft: getSize.m(paddingLeft)},
    paddingRight && {paddingRight: getSize.m(paddingRight)},
    marginTop && {marginTop: getSize.m(marginTop)},
    marginBottom && {marginBottom: getSize.m(marginBottom)},
    marginLeft && {marginLeft: getSize.m(marginLeft)},
    marginRight && {marginRight: getSize.m(marginRight)},
    paddingHorizontal && {paddingHorizontal: getSize.m(paddingHorizontal)},
    paddingVertical && {paddingVertical: getSize.m(paddingVertical)},
    marginHorizontal && {marginHorizontal: getSize.m(marginHorizontal)},
    marginVertical && {marginVertical: getSize.m(marginVertical)},
    borderRadius && {borderRadius: getSize.s(borderRadius)},
    {...StyleSheet.flatten(style)},
  ]);

  return (
    <FastImage
      {...rest}
      source={source}
      style={imageStyle}
      resizeMode={FastImage.resizeMode[resizeMode]}
      tintColor={tintColor}
      onLoadEnd={onLoadEnd}
    />
  );
};

export default Image;
