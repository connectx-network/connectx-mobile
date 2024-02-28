import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import Block from '@components/Block';
import Text from '@components/Text';
import Color from '@theme/Color';
import Font from '@theme/Font';
import React, {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import {ToastProps} from 'react-native-toast-notifications/lib/typescript/toast';

const ToastNotify: FC<ToastProps> = props => {
  return (
    <Block style={styles.container}>
      {props.warningIcon && props.type === 'warning' && (
        <Block marginRight={8}>{props.warningIcon}</Block>
      )}
      {props.successIcon && props.type === 'success' && (
        <Block marginRight={8}>{props.successIcon}</Block>
      )}
      <Text style={styles.textMessage}>{props.message}</Text>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.WHITE,
    borderRadius: getSize.m(12),
    padding: getSize.m(8),
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: WIDTH_SCREEN - getSize.s(24),
    marginBottom: getSize.m(8),
  },
  textMessage: {
    fontSize: getSize.m(12, 0.3),
    fontFamily: Font.font_regular_400,
    color: Color.TEXT_COLOR,
    flex: 1,
  },
});

export default memo(ToastNotify);
