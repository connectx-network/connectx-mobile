import FacebookIcon from '@assets/icons/auth/FacebookIcon';
import GoogleIcon from '@assets/icons/auth/GoogleIcon';
import LockIcon from '@assets/icons/auth/LockIcon';
import MailIcon from '@assets/icons/auth/MailIcon';
import PersonIcon from '@assets/icons/auth/PersonIcon';
import {getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {Block, ButtonGradient, InputField, LayoutAuth, Text} from '@components';
import {goBack, navigate} from '@navigation/navigationService';
import {VERIFY_OTP_SCREEN} from '@navigation/routes';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {memo, useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';

const RegisterScreen = () => {
  const handleSignIn = useCallback(() => {
    navigate(VERIFY_OTP_SCREEN);
  }, []);

  return (
    <LayoutAuth edges={['top', 'bottom']}>
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
      <Text style={styles.textSignIn}>Sign in</Text>
      <KeyboardAwareScrollView style={Styles.paddingHorizontal}>
        <InputField leftIcon={<PersonIcon />} placeholder="Full name" />
        <InputField leftIcon={<MailIcon />} placeholder="abc@email.com" />
        <InputField
          isPassword
          leftIcon={<LockIcon />}
          placeholder="Your password"
        />
        <InputField
          isPassword
          leftIcon={<LockIcon />}
          placeholder="Confirm password"
        />
        <ButtonGradient onPress={handleSignIn} style={styles.btnSignUP}>
          <Text style={styles.textBtnSignUp}>Sign up</Text>
        </ButtonGradient>
        <Text style={styles.textOr}>OR</Text>
        <TouchableOpacity style={styles.btnSocial} activeOpacity={0.5}>
          <GoogleIcon />
          <Text style={styles.textBtnSocial}>Login with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSocial} activeOpacity={0.5}>
          <FacebookIcon />
          <Text style={styles.textBtnSocial}>Login with Google</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      <Block style={styles.footer}>
        <Text style={styles.textHaveAccount}>Already have an account?</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={goBack}>
          <Text style={styles.textSignUp}>Sign in</Text>
        </TouchableOpacity>
      </Block>
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
  btnSignUP: {
    marginHorizontal: getSize.s(20),
    marginTop: getSize.v(12),
  },
  textBtnSignUp: {
    color: '#1F1212',
    fontFamily: Font.font_medium_500,
    fontSize: getSize.m(16),
  },
  textOr: {
    color: '#9D9898',
    fontFamily: Font.font_medium_500,
    fontSize: getSize.m(16),
    textAlign: 'center',
    marginTop: getSize.v(20),
    marginBottom: getSize.v(12),
  },
  btnSocial: {
    height: getSize.m(56),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: getSize.m(12),
    marginHorizontal: getSize.s(20),
    backgroundColor: '#1F1212',
    justifyContent: 'center',
    marginBottom: getSize.v(12),
    shadowRadius: 20,
    shadowColor: '#EDE5E5',
    shadowOffset: {
      width: 20,
      height: 0,
    },
    shadowOpacity: 0.2,
  },
  textBtnSocial: {
    fontSize: getSize.m(16, 0.3),
    fontFamily: Font.font_medium_500,
    marginLeft: getSize.m(12),
  },
  footer: {
    flexDirection: 'row',
    paddingVertical: getSize.v(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHaveAccount: {
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_thin_100,
  },
  textSignUp: {
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_regular_400,
    color: '#5669FF',
    paddingHorizontal: getSize.m(8),
    paddingVertical: 2,
  },
});

export default RegisterScreen;
