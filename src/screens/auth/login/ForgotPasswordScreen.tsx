import {Icon} from '@assets/icons';
import MailIcon from '@assets/icons/auth/MailIcon';
import {getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {ButtonGradient, InputField, LayoutAuth, Text} from '@components';
import {useToastMessage} from '@hooks/useToastMessage';
import {ResetPasswordParams} from '@model/auth';
import {goBack, navigate} from '@navigation/navigationService';
import {VERIFY_OTP_SCREEN} from '@navigation/routes';
import {RequestResetPassword} from '@services/auth.service';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FormikHelpers, useFormik} from 'formik';
import {memo, useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Email is not valid'),
});

const ForgotPasswordScreen = () => {
  const {showWarningTop} = useToastMessage();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleRequest = useCallback(
    async (
      values: Pick<ResetPasswordParams, 'email'>,
      {resetForm}: FormikHelpers<Pick<ResetPasswordParams, 'email'>>,
    ) => {
      try {
        setLoading(true);
        await RequestResetPassword(values.email.toLowerCase());
        resetForm();
        navigate(VERIFY_OTP_SCREEN, {
          email: values.email,
          isResetPassword: true,
        });
      } catch (error) {
        showWarningTop(
          typeof error === 'string'
            ? error
            : 'Sending password reset request failed!',
        );
      } finally {
        setLoading(false);
      }
    },
    [showWarningTop],
  );

  const {values, handleChange, submitForm, errors, setFieldError} = useFormik<
    Pick<ResetPasswordParams, 'email'>
  >({
    initialValues: {email: ''},
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit: handleRequest,
  });

  const handleChangeValue = (name: string) => (text: string) => {
    handleChange(name)(text);
    setFieldError(name, '');
  };

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
        <InputField
          value={values.email}
          onChangeText={handleChangeValue('email')}
          error={errors.email}
          placeholder="abc@email.com"
          leftIcon={<MailIcon />}
        />
        <ButtonGradient
          onPress={submitForm}
          isLoading={isLoading}
          disabled={isLoading}
          styleContainer={styles.containerBtnSend}
          style={styles.btnSend}>
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
  containerBtnSend: {
    marginVertical: getSize.v(20),
  },
  btnSend: {
    marginHorizontal: getSize.s(20),
  },
  textBtnSend: {
    color: '#1F1212',
    fontFamily: Font.font_medium_500,
    fontSize: getSize.m(16),
  },
});

export default ForgotPasswordScreen;
