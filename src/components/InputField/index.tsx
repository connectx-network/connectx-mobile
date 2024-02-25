import {IconApp} from '@assets/icons';
import {getSize} from '@base/common/responsive';
import Block from '@components/Block';
import Text from '@components/Text';
import Color from '@theme/Color';
import Font from '@theme/Font';
import React, {FC, ReactNode, memo} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface IProps extends TextInputProps {
  label?: string;
  styleContainer?: StyleProp<ViewStyle>;
  isPassword?: boolean;
  required?: boolean;
  error?: string;
  childrenSub?: ReactNode;
  handleShowPass?: () => void;
  leftIcon?: ReactNode;
}

const InputField: FC<IProps> = props => {
  return (
    <Block style={[styles.container, props.styleContainer]}>
      {props.label && (
        <Block row alignCenter marginBottom={8}>
          {props.required && <Text style={styles.textRequired}>*</Text>}
          <Text style={styles.textLabel}>{props.label}</Text>
        </Block>
      )}
      <Block style={[styles.box, props.error ? styles.inputError : {}]}>
        <Block marginLeft={props.leftIcon ? 12 : 0}>
          {props.leftIcon || null}
        </Block>
        <TextInput
          placeholderTextColor={props.placeholderTextColor || Color.TEXT_PL}
          style={[styles.input, props.style]}
          {...props}
        />
        {props.isPassword && (
          <TouchableOpacity
            onPress={props.handleShowPass}
            style={styles.eyePassword}
            activeOpacity={0.5}>
            <Icon
              name={props.secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
              size={getSize.m(20)}
              color={Color.WHITE}
            />
          </TouchableOpacity>
        )}
        {props.childrenSub}
      </Block>
      <Block style={styles.boxError}>
        {props.error && <Text style={styles.textError}>{props.error}</Text>}
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: getSize.m(8),
  },
  textRequired: {
    color: Color.RED,
    fontSize: getSize.m(18, 0.3),
    marginRight: getSize.m(4),
  },
  textLabel: {
    fontSize: getSize.m(13, 0.3),
    fontFamily: Font.font_regular_400,
    color: Color.WHITE,
  },
  box: {
    height: getSize.m(56),
    borderRadius: getSize.m(12),
    borderWidth: getSize.m(1),
    borderColor: '#E4DFDF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: getSize.m(44),
    flex: 1,
    paddingHorizontal: getSize.m(12),
    fontSize: getSize.m(14, 0.3),
    fontFamily: Font.font_extra_light_300,
    color: Color.WHITE,
  },
  inputError: {
    borderColor: `${Color.RED_HOLDER}60`,
  },
  eyePassword: {
    height: getSize.m(44),
    justifyContent: 'center',
    paddingHorizontal: getSize.m(12),
  },
  boxError: {
    minHeight: getSize.m(16),
    marginTop: getSize.m(4),
    paddingHorizontal: getSize.m(6),
  },
  textError: {
    fontSize: getSize.m(13, 0.3),
    fontFamily: Font.font_regular_400,
    color: Color.RED_HOLDER,
  },
});

export default InputField;
