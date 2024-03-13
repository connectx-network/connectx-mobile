import {Payload} from '@model';
import {createSlice} from '@reduxjs/toolkit';
import {ColorSchemeName} from 'react-native';

export interface IAppSettingState {
  colorScheme: ColorSchemeName;
}

const initialState: IAppSettingState = {
  colorScheme: 'dark',
};

export const appSettingSlice = createSlice({
  name: 'appSetting',
  initialState,
  reducers: {
    actionUpdateAppSetting(state, action: Payload<IAppSettingState>) {
      return (state = {
        ...state,
        ...action.payload,
      });
    },
  },
});

export const {actionUpdateAppSetting} = appSettingSlice.actions;
export default appSettingSlice.reducer;
