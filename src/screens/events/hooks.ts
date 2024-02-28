import {DataList, Paging} from '@model';
import {Event, GetEventParams} from '@model/event';
import {FetchEvents} from '@services/event.service';
import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {useCallback, useEffect, useState} from 'react';

export function useFetchEvents({page, size = 10}: GetEventParams) {
  const [data, setData] = useState<Event[]>([]);
  const [paging, setPaging] = useState<Paging>({
    page,
    size,
    totalElement: 0,
    totalPages: 0,
  });

  const onSuccess = useCallback(
    ({data: {data, ...props}}: AxiosResponse<DataList<Event[]>>) => {
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
    AxiosResponse<DataList<Event[]>>,
    Error,
    GetEventParams
  >({
    mutationKey: ['fetchEvents', {page: paging.page, size: paging.size}],
    mutationFn: FetchEvents,
    onSuccess: onSuccess,
  });

  useEffect(() => {
    mutate({page: paging.page, size: paging.size});
  }, [paging.page, paging.size]);

  const onEndReached = useCallback(() => {
    if (paging.page < paging.totalPages) {
      setPaging(prev => ({...prev, page: prev.page + 1}));
    }
  }, [paging.page, paging.totalPages]);

  const onRefresh = useCallback(() => {
    setPaging(prev => ({...prev, page: 1, totalPages: 0}));
  }, []);

  return {
    data,
    isLoading: paging.page === 1 ? isPending : false,
    isLoadMore: paging.page > 1 ? isPending : false,
    onEndReached,
    onRefresh,
  };
}
