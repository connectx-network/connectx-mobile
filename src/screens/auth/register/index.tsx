import GoogleIcon from '@assets/icons/auth/GoogleIcon';
import LockIcon from '@assets/icons/auth/LockIcon';
import MailIcon from '@assets/icons/auth/MailIcon';
import PersonIcon from '@assets/icons/auth/PersonIcon';
import {IS_IOS, JWT_KEY, JWT_REFRESH_KEY} from '@base/common/constants';
import PushController from '@base/common/pushNotification';
import {getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {
  Block,
  ButtonGradient,
  InputField,
  LayoutAuth,
  Spinner,
  Text,
} from '@components';
import {useToastMessage} from '@hooks/useToastMessage';
import appleAuth, {
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import {SignUpParams} from '@model/auth';
import {goBack, navigate, reset} from '@navigation/navigationService';
import {DRAWER_STACK, VERIFY_OTP_SCREEN} from '@navigation/routes';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {actionUpdateUser} from '@redux/slices/userSlice';
import {
  AuthApple,
  AuthGoogle,
  ResendOtpSignUpService,
  SignUpService,
} from '@services/auth.service';
import {FetchInfoMe, UploadAvatar} from '@services/user.service';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FormikHelpers, useFormik} from 'formik';
import {useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Keychain from 'react-native-keychain';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';

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
  const [isLoadingSocial, setLoadingSocial] = useState<boolean>(false);
  const dispatch = useDispatch();

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

  const handleLoginGoogle = useCallback(async () => {
    try {
      setLoadingSocial(true);
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      await auth().signInWithCredential(googleCredential);
      const token = await auth().currentUser?.getIdToken();
      if (token) {
        const {data} = await AuthGoogle({
          token,
          deviceToken: PushController.fcmToken || '',
        });
        await Keychain.setInternetCredentials(
          JWT_KEY,
          JWT_KEY,
          data.accessToken,
        );
        await Keychain.setInternetCredentials(
          JWT_REFRESH_KEY,
          JWT_REFRESH_KEY,
          data.refreshToken,
        );
        const {data: dataInfo} = await FetchInfoMe();
        dispatch(actionUpdateUser({...dataInfo, isLogged: true}));
        reset(DRAWER_STACK);
        if (userInfo.user?.photo && !dataInfo.avatarUrl) {
          const {data: dataImage} = await UploadAvatar({
            uri: userInfo.user?.photo,
            name: 'unnamed.jpg',
            type: 'image/jpg',
          });
          setTimeout(() => {
            dispatch(actionUpdateUser({avatarUrl: dataImage.url}));
          }, 2000);
        }
      }
    } catch (error) {
      typeof error === 'string' && showWarningTop(error);
    } finally {
      setLoadingSocial(false);
    }
  }, []);

  const handleLoginApple = useCallback(async () => {
    try {
      setLoadingSocial(true);
      let token: string | undefined = '';
      if (IS_IOS) {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL],
        });
        if (!appleAuthRequestResponse.identityToken) {
          throw 'Apple Sign-In failed - no identify token returned';
        }
        const {identityToken, nonce} = appleAuthRequestResponse;
        const appleCredential = auth.AppleAuthProvider.credential(
          identityToken,
          nonce,
        );
        await auth().signInWithCredential(appleCredential);
        const tokenSign = await auth().currentUser?.getIdToken();
        token = tokenSign;
      } else {
        appleAuthAndroid.configure({
          clientId: 'com.twendee.connectx.signin',
          redirectUri: 'https://beta.connectx.network/',
          scope: appleAuthAndroid.Scope.EMAIL,
          responseType: appleAuthAndroid.ResponseType.ALL,
        });
        const appleAuthRequestResponse = await appleAuthAndroid.signIn();
        if (
          appleAuthRequestResponse.id_token &&
          appleAuthRequestResponse.nonce
        ) {
          const {id_token, nonce} = appleAuthRequestResponse;
          const appleCredential = auth.AppleAuthProvider.credential(
            id_token,
            nonce,
          );
          await auth().signInWithCredential(appleCredential);
          const tokenSign = await auth().currentUser?.getIdToken();
          token = tokenSign;
        }
      }

      if (token) {
        const {data} = await AuthApple({
          token,
          deviceToken: PushController.fcmToken || '',
        });
        await Keychain.setInternetCredentials(
          JWT_KEY,
          JWT_KEY,
          data.accessToken,
        );
        await Keychain.setInternetCredentials(
          JWT_REFRESH_KEY,
          JWT_REFRESH_KEY,
          data.refreshToken,
        );
        const {data: dataInfo} = await FetchInfoMe();
        dispatch(actionUpdateUser({...dataInfo, isLogged: true}));
        reset(DRAWER_STACK);
      }
    } catch (error) {
      typeof error === 'string' && showWarningTop(error);
    } finally {
      setLoadingSocial(false);
    }
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
          keyboardType="email-address"
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

        <TouchableOpacity
          onPress={handleLoginGoogle}
          style={styles.btnSocial}
          activeOpacity={0.5}>
          <GoogleIcon />
          <Text style={styles.textBtnSocial}>Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLoginApple}
          style={styles.btnSocial}
          activeOpacity={0.5}>
          <Icon name={'logo-apple'} color={Color.WHITE} size={getSize.m(26)} />
          <Text style={styles.textBtnSocial}>Sign in with Apple</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.btnSocial} activeOpacity={0.5}>
          <FacebookIcon />
          <Text style={styles.textBtnSocial}>Login with Google</Text>
        </TouchableOpacity> */}
      </KeyboardAwareScrollView>
      <Block style={styles.footer}>
        <Text style={styles.textHaveAccount}>Already have an account?</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={goBack}>
          <Text style={styles.textSignUp}>Sign in</Text>
        </TouchableOpacity>
      </Block>
      {isLoadingSocial && (
        <Spinner mode="overlay" size={'large'} color={Color.WHITE} />
      )}
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
