import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {ButtonGradient, LayoutAuth, Text} from '@components';
import {useToastMessage} from '@hooks/useToastMessage';
import {goBack, navigate, reset} from '@navigation/navigationService';
import {
  LOGIN_SCREEN,
  RESET_PASSWORD_SCREEN,
  VerifyOTPScreenRouteProp,
} from '@navigation/routes';
import {
  ResendOtpSignUpService,
  VerifyOtpSignUpService,
  VerifyResetPasswordService,
} from '@services/auth.service';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FC, useCallback, useState} from 'react';
import {Keyboard, StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OTPTextView from 'react-native-otp-textinput';
import Icon from 'react-native-vector-icons/Ionicons';
import ResendCode from './components/ResendCode';

interface IProps {
  route: VerifyOTPScreenRouteProp;
}

const VerifyOtpScreen: FC<IProps> = ({route: {params}}) => {
  const {email, isResetPassword} = params;
  const {showWarningTop, showSuccessTop} = useToastMessage();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [verifyCode, setVerifyCode] = useState<string>('');

  const handleTextChange = useCallback((value: string) => {
    setVerifyCode(value);
    if (value.length === 6) {
      Keyboard.dismiss();
    }
  }, []);

  const handleVerify = useCallback(async () => {
    try {
      setLoading(true);
      await (isResetPassword
        ? VerifyResetPasswordService({
            email: email.toLowerCase(),
            verifyCode,
          })
        : VerifyOtpSignUpService({
            email: email.toLowerCase(),
            verifyCode,
          }));

      if (isResetPassword) {
        navigate(RESET_PASSWORD_SCREEN, {email, otp: verifyCode});
      } else {
        showSuccessTop('Register account successfully!');
        reset(LOGIN_SCREEN);
      }
    } catch (error: any) {
      showWarningTop(
        (typeof error === 'string' ? error : null) || 'OTP is not correct!',
      );
    } finally {
      setLoading(false);
    }
  }, [verifyCode, isResetPassword]);

  const handleSendCode = useCallback(async () => {
    try {
      await ResendOtpSignUpService({email});
      showSuccessTop('Resend code successfully');
    } catch (error) {
      showWarningTop(
        (typeof error === 'string' ? error : null) || 'Resend code failed!',
      );
    }
  }, [email, showWarningTop]);

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
      <Text style={styles.textSignIn}>Verification</Text>
      <KeyboardAwareScrollView style={Styles.paddingHorizontal}>
        <Text style={styles.textNote}>We’ve send you the verification</Text>
        <Text style={styles.textNote}>code on +1 2620 0323 7631</Text>
        <OTPTextView
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          defaultValue=""
          tintColor={'#5669FF'}
          offTintColor={Color.WHITE}
          autoFocus
          inputCount={6}
          handleTextChange={handleTextChange}
        />
        <ButtonGradient
          disabled={!(!isLoading && verifyCode.length === 6)}
          isLoading={isLoading}
          style={styles.btnContinue}
          onPress={handleVerify}>
          <Text style={styles.textBtnContinue}>Continue</Text>
        </ButtonGradient>
        <ResendCode handleSendCode={handleSendCode} />
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
    marginBottom: getSize.m(6),
  },
  textInputContainer: {
    marginTop: getSize.v(20),
    marginBottom: getSize.v(40),
  },
  roundedTextInput: {
    borderRadius: getSize.m(12),
    borderWidth: getSize.m(2),
    width: (WIDTH_SCREEN - getSize.s(40)) / 6 - getSize.m(12),
    height: (WIDTH_SCREEN - getSize.s(40)) / 6 - getSize.m(12),
    borderBottomWidth: getSize.m(2),
    color: Color.WHITE,
    fontSize: getSize.m(20, 0.3),
    fontFamily: Font.font_medium_500,
  },
  btnContinue: {
    marginHorizontal: getSize.s(20),
    marginBottom: getSize.v(20),
  },
  textBtnContinue: {
    color: '#1F1212',
    fontFamily: Font.font_medium_500,
    fontSize: getSize.m(16),
  },
});

export default VerifyOtpScreen;
