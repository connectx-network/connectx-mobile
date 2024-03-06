import FacebookIcon from '@assets/icons/auth/FacebookIcon';
import GoogleIcon from '@assets/icons/auth/GoogleIcon';
import LockIcon from '@assets/icons/auth/LockIcon';
import MailIcon from '@assets/icons/auth/MailIcon';
import Images from '@assets/images';
import {getSize} from '@base/common/responsive';
import {
  Block,
  ButtonGradient,
  Image,
  InputField,
  LayoutAuth,
  Spinner,
  Text,
} from '@components';
import {useToastMessage} from '@hooks/useToastMessage';
import {LoginParams} from '@model/auth';
import {navigate, reset} from '@navigation/navigationService';
import {
  DRAWER_STACK,
  FORGOT_PASSWORD_SCREEN,
  REGISTER_SCREEN,
} from '@navigation/routes';
import {actionUpdateUser} from '@redux/slices/userSlice';
import {AuthApple, AuthGoogle, LoginService} from '@services/auth.service';
import Font from '@theme/Font';
import {useFormik} from 'formik';
import {useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import * as Keychain from 'react-native-keychain';
import {IS_IOS, JWT_KEY, JWT_REFRESH_KEY} from '@base/common/constants';
import {FetchInfoMe, FetchInfoUser, UploadAvatar} from '@services/user.service';
import PushController from '@base/common/pushNotification';
import {
  GoogleSignin,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';
import appleAuth, {
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import {Icon} from '@assets/icons';
import Color from '@theme/Color';
import auth from '@react-native-firebase/auth';

const validationSchema = Yup.object({
  email: Yup.string().required('Email is required').email('Email is not valid'),
  password: Yup.string().required('Password is required'),
});

const LoginScreen = () => {
  const {showWarningTop} = useToastMessage();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoadingSocial, setLoadingSocial] = useState<boolean>(false);
  const dispatch = useDispatch();
  const initialValues: LoginParams = {
    email: __DEV__ ? 'ducphamvan0711@gmail.com' : '',
    password: __DEV__ ? '123456aA@@' : '',
  };

  const handleSignIn = useCallback(
    async (values: LoginParams) => {
      try {
        setLoading(true);
        const {data} = await LoginService({
          email: values.email.toLowerCase(),
          password: values.password,
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
      } catch (error) {
        showWarningTop('Email or password is incorrect!');
      } finally {
        setLoading(false);
      }
    },
    [showWarningTop],
  );

  const {values, handleChange, errors, setFieldError, submitForm} =
    useFormik<LoginParams>({
      initialValues,
      validateOnChange: false,
      validateOnBlur: false,
      validationSchema,
      onSubmit: handleSignIn,
    });

  const handleForgot = useCallback(() => {
    navigate(FORGOT_PASSWORD_SCREEN);
  }, []);

  const handleSignUp = useCallback(() => {
    navigate(REGISTER_SCREEN);
  }, []);

  const handleChangeValue = (name: string) => (text: string) => {
    handleChange(name)(text);
    setFieldError(name, '');
  };

  const handleLoginGoogle = useCallback(async () => {
    try {
      setLoadingSocial(true);
      // await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
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
    <LayoutAuth edges={['bottom', 'top']}>
      <KeyboardAwareScrollView>
        <Block style={styles.logo}>
          <Image source={Images.LOGO_DARK} width={62} height={62} />
          <Text style={styles.nameApp}>ConnectX</Text>
        </Block>
        <Block style={styles.content}>
          <Text style={styles.textSignIn}>Sign in</Text>
          <InputField
            error={errors.email}
            placeholder="abc@email.com"
            leftIcon={<MailIcon />}
            value={values.email}
            onChangeText={handleChangeValue('email')}
          />
          <InputField
            error={errors.password}
            placeholder="Your password"
            leftIcon={<LockIcon />}
            value={values.password}
            onChangeText={handleChangeValue('password')}
            isPassword
          />
          <Block row alignEnd justifyEnd>
            {/* <Text style={styles.textForget}>Remember Me</Text> */}
            <TouchableOpacity activeOpacity={0.5} onPress={handleForgot}>
              <Text style={styles.textForget}>Forgot Password?</Text>
            </TouchableOpacity>
          </Block>
        </Block>
        <ButtonGradient
          isLoading={isLoading}
          disabled={isLoading}
          style={styles.btnSignIn}
          styleContainer={styles.containerBtnSignIn}
          onPress={submitForm}>
          <Text style={styles.textBtnSignIn}>Sign in</Text>
        </ButtonGradient>
        <Text style={styles.textOr}>OR</Text>
        <TouchableOpacity
          onPress={handleLoginGoogle}
          style={styles.btnSocial}
          activeOpacity={0.5}>
          <GoogleIcon />
          <Text style={styles.textBtnSocial}>Login with Google</Text>
        </TouchableOpacity>
        {__DEV__ && (
          <TouchableOpacity
            onPress={handleLoginApple}
            style={styles.btnSocial}
            activeOpacity={0.5}>
            <Icon
              name={'logo-apple'}
              color={Color.WHITE}
              size={getSize.m(26)}
            />
            <Text style={styles.textBtnSocial}>Login with Apple</Text>
          </TouchableOpacity>
        )}
      </KeyboardAwareScrollView>
      <Block style={styles.footer}>
        <Text style={styles.textNotAccount}>Don’t have an account?</Text>
        <TouchableOpacity activeOpacity={0.5} onPress={handleSignUp}>
          <Text style={styles.textSignUp}>Sign up</Text>
        </TouchableOpacity>
      </Block>
      {isLoadingSocial && (
        <Spinner mode="overlay" size={'large'} color={Color.WHITE} />
      )}
    </LayoutAuth>
  );
};

const styles = StyleSheet.create({
  logo: {marginTop: getSize.v(20), alignItems: 'center'},
  nameApp: {
    fontSize: getSize.m(30, 0.3),
    fontFamily: Font.font_medium_500,
    marginTop: getSize.v(12),
  },
  content: {marginHorizontal: getSize.s(20)},
  textSignIn: {
    fontSize: getSize.m(24, 0.3),
    fontFamily: Font.font_medium_500,
    marginTop: getSize.v(20),
    marginBottom: getSize.v(12),
  },
  textForget: {
    fontSize: getSize.m(14, 0.3),
    fontFamily: Font.font_extra_light_300,
  },
  containerBtnSignIn: {
    marginTop: getSize.v(30),
  },
  btnSignIn: {
    marginHorizontal: getSize.s(40),
  },
  textBtnSignIn: {
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
    marginHorizontal: getSize.s(40),
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
  textNotAccount: {
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_extra_light_300,
  },
  textSignUp: {
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_regular_400,
    color: '#5669FF',
    paddingHorizontal: getSize.m(8),
    paddingVertical: 2,
  },
});

export default LoginScreen;
