export interface UserInfo {
  activated: boolean;
  address: null | string;
  avatarUrl: null | string;
  country: null | string;
  description: null | string;
  email: string;
  fullName: string;
  gender: null | string;
  id: string;
  isPrivate: boolean;
  nickname: null | string;
  userRole: string;
  userInterests: Array<any>;
  followers: number;
  following: number;
}
