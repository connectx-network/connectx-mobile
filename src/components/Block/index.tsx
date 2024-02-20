import React, {memo} from 'react';

import {
  handleMargin,
  handlePadding,
  handleRound,
  handleSquare,
} from '@components/shared';
import {isNumber} from 'lodash';
import {StyleSheet, View} from 'react-native';

import Color from '@theme/Color';
import styles from './styles';
import {IBlock} from './types';
import {getSize} from '@base/common/responsive';

const Block: React.FC<IBlock> = ({
  flex,
  flexShrink,
  flexGrow,
  row,
  column,
  shadow,
  backgroundColor,
  space,
  padding,
  margin,
  alignStart,
  alignCenter,
  alignEnd,
  wrap,
  justifyCenter,
  justifyEnd,
  justifyStart,
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
  radius,
  height,
  width,
  square,
  round,
  borderWidth,
  relative,
  absolute,
  top,
  left,
  right,
  bottom,
  borderColor,
  children,
  overflow,
  alignSelf,
  style,
  shadowColor,
  opacity,
  elevation,
  widthNotResponse,
  customsFlex,
  ...props
}) => {
  const blockStyles = StyleSheet.flatten([
    flex && (customsFlex ? {flex: customsFlex} : styles.block),
    flexShrink && styles.flexShrink,
    flexGrow && styles.flexGrow,
    !flex && {flex: 0},
    width && {
      width: isNumber(width)
        ? widthNotResponse
          ? width
          : getSize.s(width as number)
        : width,
    },
    height && {height: isNumber(height) ? getSize.m(height as number) : height},
    row && styles.row,
    column && styles.column,
    shadow && {
      ...styles.shadow,
      shadowColor: shadowColor ? Color[shadowColor] : Color.BLACK,
      elevation: elevation || 3,
    },
    wrap && {flexWrap: 'wrap'},
    backgroundColor && {
      backgroundColor: Color[backgroundColor],
    },
    backgroundColor && !Color[backgroundColor] && {backgroundColor},
    padding && {...handlePadding(getSize.m(padding))},
    margin && {...handleMargin(getSize.m(margin))},
    alignStart && styles.alignStart,
    alignCenter && styles.alignCenter,
    alignEnd && styles.alignEnd,
    justifyCenter && styles.justifyCenter,
    justifyStart && styles.justifyStart,
    justifyEnd && styles.justifyEnd,
    space && {justifyContent: `space-${space}`},
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
    radius && {borderRadius: getSize.s(radius)},
    borderWidth && {borderWidth: borderWidth},
    square && {...handleSquare(getSize.s(square))},
    round && {...handleRound(getSize.s(round))},
    isNumber(opacity) && {opacity: opacity},
    borderColor && {
      borderColor: borderColor || Color.BLACK,
    },
    relative && {position: 'relative'},
    absolute && {position: 'absolute'},
    top && isNumber(top) && {top: getSize.v(top)},
    left && isNumber(left) && {left: getSize.s(left)},
    right && isNumber(right) && {right: getSize.s(right)},
    bottom && isNumber(bottom) && {bottom: getSize.v(bottom)},
    overflow && {overflow},
    alignSelf && {alignSelf},
    {...StyleSheet.flatten(style)},
  ]);

  return (
    <View style={blockStyles} {...props}>
      {children}
    </View>
  );
};

export default Block;
