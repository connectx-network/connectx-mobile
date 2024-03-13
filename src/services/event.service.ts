import {
  Event,
  GetEventParams,
  GetQrCodeEventParams,
  IDetailEvent,
  InfoQrEventResponse,
  ParamsFetchJoinEvent,
} from '@model/event';
import {AxiosResponse} from 'axios';
import api from './api';
import {EventRouteEnum} from './routeApi';
import {DataList} from '@model';
import {UserInfo} from '@model/user';

export async function FetchEvents(
  params: GetEventParams,
): Promise<AxiosResponse<DataList<Event[]>>> {
  return api(EventRouteEnum.GetEvent, null, {
    method: 'GET',
    params,
  });
}

export async function FetchDetailEvent(
  id: string,
): Promise<AxiosResponse<IDetailEvent>> {
  return api(`${EventRouteEnum.GetEvent}/${id}`, null, {
    method: 'GET',
  });
}

export async function JoinEvent(
  id: string,
): Promise<AxiosResponse<{success: boolean}>> {
  return api(`${EventRouteEnum.JoinEvent}/${id}`, null);
}

export async function CheckJoinEvent(
  id: string,
): Promise<AxiosResponse<{joined: boolean}>> {
  return api(`${EventRouteEnum.CheckJoinEvent}/${id}`, null, {method: 'GET'});
}

export async function FetchListJoinEvent(
  params: ParamsFetchJoinEvent,
): Promise<
  AxiosResponse<DataList<Array<{user: UserInfo; checkedIn: boolean}>>>
> {
  return api(EventRouteEnum.ListJoinUserEvent, null, {
    method: 'GET',
    params,
  });
}

export async function GetInfoQrCodeEvent(
  params: GetQrCodeEventParams,
): Promise<AxiosResponse<InfoQrEventResponse>> {
  return api(EventRouteEnum.GetInfoQREvent, null, {
    method: 'GET',
    params,
  });
}

export async function CheckIneEvent(
  body: GetQrCodeEventParams,
): Promise<AxiosResponse<any>> {
  return api(EventRouteEnum.CheckInEvent, body, {method: 'PATCH'});
}
