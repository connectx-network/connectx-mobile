import {
  AuthGoogleBody,
  LoginParams,
  ResetPasswordParams,
  ResponseLogin,
  SignUpParams,
  VerifySignUpParams,
} from '@model/auth';
import api from './api';
import {AuthRouteEnum} from './routeApi';
import {AxiosResponse} from 'axios';

export async function SignUpService(
  body: SignUpParams,
): Promise<AxiosResponse<{success: boolean}>> {
  return api(AuthRouteEnum.SignUp, body);
}

export async function VerifyOtpSignUpService(
  body: VerifySignUpParams,
): Promise<AxiosResponse<{success: boolean}>> {
  return api(AuthRouteEnum.VerifySignUp, body);
}

export async function ResendOtpSignUpService(body: {
  email: string;
}): Promise<AxiosResponse<{success: boolean}>> {
  return api(AuthRouteEnum.ResendOTPSignIn, body);
}

export async function LoginService(
  body: LoginParams,
): Promise<AxiosResponse<ResponseLogin>> {
  return api(AuthRouteEnum.SignIn, body);
}

export async function RequestResetPassword(
  email: string,
): Promise<AxiosResponse<{success: boolean}>> {
  return api(AuthRouteEnum.RequestResetPassword, {email});
}

export async function VerifyResetPasswordService(
  body: VerifySignUpParams,
): Promise<AxiosResponse<{success: boolean}>> {
  return api(AuthRouteEnum.VerifyResetPassword, body);
}

export async function ResetPasswordService(
  body: ResetPasswordParams,
): Promise<AxiosResponse<{success: boolean}>> {
  return api(AuthRouteEnum.ResetPassword, body);
}

export async function AuthGoogle(
  body: AuthGoogleBody,
): Promise<AxiosResponse<ResponseLogin>> {
  return api(AuthRouteEnum.AuthGoogle, body);
}

export async function AuthApple(
  body: AuthGoogleBody,
): Promise<AxiosResponse<ResponseLogin>> {
  return api(AuthRouteEnum.AuthApple, body);
}
