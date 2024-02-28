import {Event, GetEventParams, IDetailEvent} from '@model/event';
import {AxiosResponse} from 'axios';
import api from './api';
import {EventRouteEnum} from './routeApi';
import {DataList} from '@model';

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
