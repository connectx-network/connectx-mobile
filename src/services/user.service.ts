import {AxiosResponse} from 'axios';
import api from './api';
import {UserRouteEnum} from './routeApi';
import {UserInfo} from '@model/user';

export async function FetchInfoUser(
  id: string,
): Promise<AxiosResponse<UserInfo>> {
  return api(`${UserRouteEnum.User}/${id}`, null, {method: 'GET'});
}

export async function UpdateInfoUser(body): Promise<AxiosResponse<any>> {
  return api(UserRouteEnum.User, body, {
    method: 'PUT',
  });
}
