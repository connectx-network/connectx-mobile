import {Icon} from '@assets/icons';
import MailIcon from '@assets/icons/auth/MailIcon';
import {getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {ButtonGradient, InputField, LayoutAuth, Text} from '@components';
import {goBack} from '@navigation/navigationService';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ForgotPasswordScreen = () => {
  return (
    <LayoutAuth>
      <TouchableOpacity
        onPress={goBack}
        style={styles.btnBack}
        activeOpacity={0.5}>
        <Icon
          name={'arrow-back-outline'}
          size={getSize.m(28)}
          color={Color.WHITE}
        />
      </TouchableOpacity>
      <Text style={styles.textSignIn}>Reset Password</Text>
      <KeyboardAwareScrollView style={Styles.paddingHorizontal}>
        <Text style={styles.textNote}>
          Please enter your email address to request a password reset
        </Text>
        <InputField placeholder="abc@email.com" leftIcon={<MailIcon />} />
        <ButtonGradient style={styles.btnSend}>
          <Text style={styles.textBtnSend}>Send</Text>
        </ButtonGradient>
      </KeyboardAwareScrollView>
    </LayoutAuth>
  );
};

const styles = StyleSheet.create({
  btnBack: {
    marginLeft: getSize.s(15),
    alignSelf: 'flex-start',
    padding: getSize.m(5),
    paddingLeft: getSize.s(5),
    marginBottom: getSize.v(8),
  },
  textSignIn: {
    fontSize: getSize.m(24, 0.3),
    fontFamily: Font.font_medium_500,
    marginLeft: getSize.s(20),
    marginBottom: getSize.v(20),
  },
  textNote: {
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_thin_100,
    lineHeight: getSize.m(25),
    marginBottom: getSize.v(25),
  },
  btnSend: {
    marginHorizontal: getSize.s(20),
    marginBottom: getSize.v(20),
  },
  textBtnSend: {
    color: '#1F1212',
    fontFamily: Font.font_medium_500,
    fontSize: getSize.m(16),
  },
});

export default ForgotPasswordScreen;
