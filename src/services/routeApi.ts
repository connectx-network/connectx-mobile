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
  JoinEvent = '/event/join',
  CheckJoinEvent = '/event/check-join',
  ListJoinUserEvent = '/event/joined-user',
  GetInfoQREvent = '/event/user-event',
  CheckInEvent = '/event/check-in',
}

export enum UserRouteEnum {
  User = '/user',
  AuthSelf = '/auth/self',
  UploadAvatar = '/user/avatar',
  DeleteAccount = '/auth',
}

export enum NotifyRouteEnum {
  Notification = '/notification',
}
