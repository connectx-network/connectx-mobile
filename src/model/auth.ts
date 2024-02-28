import {UserInfo} from './user';

export interface SignUpParams {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userRole: string;
}

export interface VerifySignUpParams {
  email: string;
  verifyCode: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface ResponseLogin {
  user: UserInfo;
  refreshToken: string;
  accessToken: string;
}

export interface ResetPasswordParams {
  email: string;
  password: string;
  otp: string;
}
