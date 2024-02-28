import {Payload} from '@model';
import {UserInfo} from '@model/user';
import {createSlice} from '@reduxjs/toolkit';

export interface UserState extends UserInfo {
  isLogged: boolean;
}

const initialState: UserState = {
  isLogged: false,
  activated: false,
  address: null,
  avatarUrl: null,
  country: null,
  description: null,
  email: '',
  fullName: '',
  gender: null,
  id: '',
  isPrivate: false,
  nickname: null,
  userRole: '',
  userInterests: [],
  followers: 0,
  following: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    actionUpdateUser(state, action: Payload<Partial<UserState>>) {
      return (state = {
        ...state,
        ...action.payload,
      });
    },
    actionLogoutUser() {
      return initialState;
    },
  },
});

export const {actionUpdateUser, actionLogoutUser} = userSlice.actions;
export default userSlice.reducer;
