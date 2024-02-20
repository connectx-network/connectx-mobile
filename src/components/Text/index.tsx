import React, {forwardRef, memo} from 'react';

import {isNumber} from 'lodash';
import {Animated, StyleSheet, Text} from 'react-native';

import {getSize} from '@base/common/responsive';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {handleMargin, handlePadding} from '../shared';
import {ITypography} from './types';

const Typography = forwardRef<any, ITypography>((props, ref) => {
  const {
    flex,
    flexShrink,
    flexGrow,
    size = 14,
    color = Color.WHITE,
    center,
    right,
    justify,
    padding,
    margin,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    paddingVertical,
    paddingHorizontal,
    marginVertical,
    marginHorizontal,
    style,
    lineHeight,
    animated,
    fontFamily,
    customsFlex,
    ...textProps
  } = props;
  const textStyle = StyleSheet.flatten([
    flex && {flex: customsFlex || 1},
    flexShrink && {flexShrink: 1},
    flexGrow && {flexGrow: 1},
    {color: Color[color] || color},
    center && {textAlign: 'center'},
    right && {textAlign: 'right'},
    justify && {textAlign: 'justify'},
    padding && {...handlePadding(getSize.m(padding))},
    margin && {...handleMargin(getSize.m(margin))},
    paddingTop && {paddingTop: getSize.m(paddingTop)},
    paddingRight && {paddingRight: getSize.m(paddingRight)},
    paddingBottom && {paddingBottom: getSize.m(paddingBottom)},
    paddingLeft && {paddingLeft: getSize.m(paddingLeft)},
    marginBottom && {marginBottom: getSize.m(marginBottom)},
    marginTop && {marginTop: getSize.m(marginTop)},
    marginRight && {marginRight: getSize.m(marginRight)},
    marginLeft && {marginLeft: getSize.m(marginLeft)},
    paddingHorizontal && {paddingHorizontal: getSize.m(paddingHorizontal)},
    paddingVertical && {paddingVertical: getSize.m(paddingVertical)},
    marginHorizontal && {marginHorizontal: getSize.m(marginHorizontal)},
    marginVertical && {marginVertical: getSize.m(marginVertical)},
    lineHeight && isNumber(lineHeight) && {lineHeight: getSize.m(lineHeight)},
    fontFamily && {fontFamily: fontFamily || Font.font_regular_400},
    {fontSize: getSize.m(size, 0.3)},
    {...StyleSheet.flatten(style)},
  ]);

  if (animated) {
    return (
      <Animated.Text
        style={textStyle}
        {...textProps}
        maxFontSizeMultiplier={12}>
        {props.children}
      </Animated.Text>
    );
  }

  return (
    <Text style={textStyle} {...textProps} ref={ref}>
      {props.children}
    </Text>
  );
});

export default Typography;
