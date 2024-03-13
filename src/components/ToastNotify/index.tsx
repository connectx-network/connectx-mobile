import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import Block from '@components/Block';
import Text from '@components/Text';
import Font from '@theme/Font';
import {TColors} from '@theme/Theme';
import {useStyle} from '@theme/useStyle';
import React, {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import {ToastProps} from 'react-native-toast-notifications/lib/typescript/toast';

const ToastNotify: FC<ToastProps> = props => {
  const styles = useStyle(getStyles);
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

const getStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.mainForeground,
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
      color: colors.mainBackground,
      flex: 1,
    },
  });

export default memo(ToastNotify);
