import {Paging} from '@model';
import api from './api';
import {NotifyRouteEnum} from './routeApi';
import {AxiosResponse} from 'axios';

export function FetchNotification(
  params: Pick<Paging, 'page' | 'size'>,
): Promise<AxiosResponse<any>> {
  return api(NotifyRouteEnum.Notification, null, {
    method: 'GET',
    params,
  });
}
