import {DataList, Paging} from '@model';
import api from './api';
import {NotifyRouteEnum} from './routeApi';
import {AxiosResponse} from 'axios';
import {ItemNotification} from '@model/notification';

export function FetchNotification(
  params: Pick<Paging, 'page' | 'size'>,
): Promise<AxiosResponse<DataList<ItemNotification[]>>> {
  return api(NotifyRouteEnum.Notification, null, {
    method: 'GET',
    params,
  });
}
