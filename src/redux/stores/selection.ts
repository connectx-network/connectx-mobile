import {IRootState} from '.';

export function uStateUser(state: IRootState) {
  return state.user;
}
export function uStateAppSetting(state: IRootState) {
  return state.appSetting;
}
