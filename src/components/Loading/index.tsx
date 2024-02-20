import {getSize} from '@base/common/responsive';
import Color from '@theme/Color';
import React, {memo} from 'react';

import {StyleSheet, View} from 'react-native';
import {MaterialIndicator} from 'react-native-indicators';

export const SIZES = {SMALL: 'small', LARGE: 'large'};
export const Mode = {normal: 'normal', full: 'full', overlay: 'overlay'};

type ISpinnerProps = {
  color?: string;
  size?: 'small' | 'large' | number;
  mode?: 'normal' | 'full' | 'overlay';
};

const Spinner = ({color, size, mode}: ISpinnerProps) => {
  return (
    <View
      style={
        mode === Mode.full
          ? styles.containerFullStretch
          : mode === Mode.overlay
          ? styles.containerOverlay
          : styles.container
      }>
      {/* <ActivityIndicator
        size={size ? size : 'large'}
        color={color ? color : Color.YELLOW}
        style={[styles.wrapper, {borderRadius: size === SIZES.SMALL ? 10 : 20}]}
      /> */}
      <MaterialIndicator
        size={
          typeof size === 'number'
            ? size
            : size === 'small'
            ? getSize.m(28)
            : getSize.m(40)
        }
        color={color ? color : Color.YELLOW}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  containerFullStretch: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    backgroundColor: 'transparent',
    zIndex: 100,
  },
});

export default memo(Spinner);
