export enum AuthRouteEnum {
  SignUp = '/auth/sign-up',
  SignIn = '/auth/sign-in',
  VerifySignUp = '/auth/verify-otp/account',
  ResendOTPSignIn = '/auth/request/verify-code',
  RequestResetPassword = '/auth/request/reset-password',
  VerifyResetPassword = '/auth/verify-otp/reset-password',
  ResetPassword = '/auth/reset-password',
}

export enum EventRouteEnum {
  GetEvent = '/event',
}

export enum UserRouteEnum {
  User = '/user',
}
