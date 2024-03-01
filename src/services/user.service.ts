import {AxiosResponse} from 'axios';
import api from './api';
import {UserRouteEnum} from './routeApi';
import {UserInfo} from '@model/user';
import {FileUpload} from '@model';

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

export async function FetchInfoMe(): Promise<AxiosResponse<UserInfo>> {
  return api(UserRouteEnum.AuthSelf, null, {method: 'GET'});
}

export async function UploadAvatar(
  body: FileUpload,
): Promise<AxiosResponse<{url: string}>> {
  const formData = new FormData();
  formData.append('file', body);
  return api(UserRouteEnum.UploadAvatar, formData, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
