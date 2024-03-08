import {AxiosResponse} from 'axios';
import api from './api';
import {UserRouteEnum} from './routeApi';
import {StatusConnect, UserInfo} from '@model/user';
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

export async function DeleteAccount(): Promise<any> {
  return api(UserRouteEnum.DeleteAccount, null, {
    method: 'DELETE',
  });
}

export async function ConnectUser(id: string): Promise<any> {
  return api(`${UserRouteEnum.ConnectUser}/${id}`, null);
}

export async function UnConnectUser(id: string): Promise<any> {
  return api(UserRouteEnum.ConnectUser, {targetId: id}, {method: 'DELETE'});
}

export async function CheckConnectUser(
  targetId: string,
): Promise<AxiosResponse<StatusConnect>> {
  return api(`${UserRouteEnum.CheckConnectUser}/${targetId}`, null, {
    method: 'GET',
  });
}
