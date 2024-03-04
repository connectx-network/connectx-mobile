import {DataList, Paging} from '@model';
import {IDetailEvent, ParamsFetchJoinEvent} from '@model/event';
import {UserInfo} from '@model/user';
import {FetchDetailEvent, FetchListJoinEvent} from '@services/event.service';
import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {useCallback, useEffect, useState} from 'react';

export function useDetailEvent(id: string) {
  const [data, setData] = useState<IDetailEvent | null>(null);

  const onSuccess = useCallback((data: AxiosResponse<IDetailEvent>) => {
    setData(data.data);
  }, []);

  const {mutate, isPending} = useMutation<
    AxiosResponse<IDetailEvent>,
    Error,
    string
  >({
    mutationKey: ['detailEvent', id],
    mutationFn: FetchDetailEvent,
    onSuccess,
  });

  useEffect(() => {
    mutate(id);
  }, [id]);

  return {data, isLoading: isPending};
}

export function useFetchJoinEvent({
  page,
  size,
  userId,
  eventId,
}: ParamsFetchJoinEvent) {
  const [data, setData] = useState<Array<{user: UserInfo}>>([]);
  const [paging, setPaging] = useState<Paging>({
    page,
    size,
    totalElement: 0,
    totalPages: 0,
  });

  const onSuccess = useCallback(
    ({
      data: {data, ...props},
    }: AxiosResponse<DataList<Array<{user: UserInfo}>>>) => {
      if (props.page === 1) {
        setData(data);
      } else {
        setData(prev => [...prev, ...data]);
      }
      setPaging(props);
    },
    [],
  );

  const {mutate, isPending} = useMutation<
    AxiosResponse<DataList<Array<{user: UserInfo}>>>,
    Error,
    ParamsFetchJoinEvent
  >({
    mutationKey: [
      'fetchJoinEvent',
      {page: paging.page, size: paging.size, userId, eventId},
    ],
    mutationFn: FetchListJoinEvent,
    onSuccess,
  });

  useEffect(() => {
    mutate({page: paging.page, size: paging.size, userId, eventId});
  }, [paging.page, paging.size, userId, eventId]);

  const onEndReached = useCallback(() => {
    if (paging.page < paging.totalPages) {
      setPaging(prev => ({...prev, page: prev.page + 1}));
    }
  }, [paging.page, paging.totalPages]);

  const onRefresh = useCallback(() => {
    setPaging({
      page,
      size,
      totalElement: 0,
      totalPages: 0,
    });
  }, [page, size]);

  return {
    totalElement: paging.totalElement,
    data,
    onEndReached,
    onRefresh,
    isLoading: paging.page === 1 ? isPending : false,
    isLoadMore: paging.page > 1 ? isPending : false,
  };
}
