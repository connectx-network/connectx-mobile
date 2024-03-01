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
import {memo, useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {FormikHelpers, useFormik} from 'formik';
import {SignUpParams} from '@model/auth';
import * as Yup from 'yup';
import {useToastMessage} from '@hooks/useToastMessage';
import {ResendOtpSignUpService, SignUpService} from '@services/auth.service';

const initialValues: SignUpParams = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  userRole: 'USER',
};

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().required('Email is required').email('Email is not valid'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .trim()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Confirm password does not match password'),
});

const RegisterScreen = () => {
  const {showWarningTop} = useToastMessage();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSignIn = useCallback(
    async (values: SignUpParams, {resetForm}: FormikHelpers<SignUpParams>) => {
      try {
        setLoading(true);
        await SignUpService({...values, email: values.email.toLowerCase()});
        navigate(VERIFY_OTP_SCREEN, {email: values.email});
      } catch (error: any) {
        if (error === 'User has not activated yet!') {
          await ResendOtpSignUpService({email: values.email});
          resetForm();
          navigate(VERIFY_OTP_SCREEN, {email: values.email});
        } else {
          showWarningTop(
            (typeof error === 'string' ? error : null) ||
              'Account registration failed',
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [showWarningTop],
  );

  const {values, handleChange, submitForm, errors, setFieldError} =
    useFormik<SignUpParams>({
      initialValues,
      validateOnBlur: false,
      validateOnChange: false,
      validationSchema,
      onSubmit: handleSignIn,
    });

  const handleChangeValue = (name: string) => (text: string) => {
    handleChange(name)(text);
    setFieldError(name, '');
  };

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
        <InputField
          value={values.fullName}
          onChangeText={handleChangeValue('fullName')}
          leftIcon={<PersonIcon />}
          placeholder="Full name *"
          error={errors.fullName}
        />
        <InputField
          value={values.email}
          onChangeText={handleChangeValue('email')}
          leftIcon={<MailIcon />}
          placeholder="Your email *"
          error={errors.email}
        />
        <InputField
          isPassword
          value={values.password}
          onChangeText={handleChangeValue('password')}
          leftIcon={<LockIcon />}
          placeholder="Your password *"
          error={errors.password}
        />
        <InputField
          isPassword
          value={values.confirmPassword}
          onChangeText={handleChangeValue('confirmPassword')}
          leftIcon={<LockIcon />}
          placeholder="Confirm password *"
          error={errors.confirmPassword}
        />
        <ButtonGradient
          disabled={isLoading}
          onPress={submitForm}
          isLoading={isLoading}
          style={styles.btnSignUP}>
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
