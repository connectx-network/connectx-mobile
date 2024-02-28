import {Icon} from '@assets/icons';
import LockIcon from '@assets/icons/auth/LockIcon';
import MailIcon from '@assets/icons/auth/MailIcon';
import {getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {ButtonGradient, InputField, LayoutAuth, Text} from '@components';
import {useToastMessage} from '@hooks/useToastMessage';
import {ResetPasswordParams, SignUpParams} from '@model/auth';
import {goBack, navigate, reset} from '@navigation/navigationService';
import {
  LOGIN_SCREEN,
  ResetPasswordScreenRouteProp,
  VERIFY_OTP_SCREEN,
} from '@navigation/routes';
import {
  RequestResetPassword,
  ResetPasswordService,
} from '@services/auth.service';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FormikHelpers, useFormik} from 'formik';
import {FC, useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

interface IProps {
  route: ResetPasswordScreenRouteProp;
}
type IForm = Pick<SignUpParams, 'password' | 'confirmPassword'>;

const validationSchema = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .trim()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Confirm password does not match password'),
});

const initialValues: IForm = {
  password: '',
  confirmPassword: '',
};

const ResetPasswordScreen: FC<IProps> = ({route: {params}}) => {
  const {email, otp} = params;
  const {showWarningTop, showSuccessTop} = useToastMessage();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleRequest = useCallback(
    async (values: IForm, {resetForm}: FormikHelpers<IForm>) => {
      try {
        setLoading(true);
        await ResetPasswordService({
          email: email.toLowerCase(),
          otp,
          password: values.password,
        });
        resetForm();
        reset(LOGIN_SCREEN);
        showSuccessTop('Reset password successfully!');
      } catch (error) {
        showWarningTop(
          typeof error === 'string' ? error : 'Reset password failed!',
        );
      } finally {
        setLoading(false);
      }
    },
    [email, otp, showWarningTop],
  );

  const {values, handleChange, submitForm, errors, setFieldError} =
    useFormik<IForm>({
      initialValues,
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
        <InputField
          value={values.password}
          onChangeText={handleChangeValue('password')}
          error={errors.password}
          placeholder="New password"
          leftIcon={<LockIcon />}
          styleContainer={styles.styleContainerPass}
        />
        <InputField
          value={values.confirmPassword}
          onChangeText={handleChangeValue('confirmPassword')}
          error={errors.confirmPassword}
          placeholder="Confirm password"
          leftIcon={<LockIcon />}
        />
        <ButtonGradient
          onPress={submitForm}
          isLoading={isLoading}
          disabled={isLoading}
          styleContainer={styles.containerBtnSend}
          style={styles.btnSend}>
          <Text style={styles.textBtnSend}>Save password</Text>
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
  styleContainerPass: {
    marginBottom: getSize.v(18),
  },
});

export default ResetPasswordScreen;
