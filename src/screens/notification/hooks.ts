import {DataList, Paging} from '@model';
import {ItemNotification} from '@model/notification';
import {UserState} from '@redux/slices/userSlice';
import {IRootState} from '@redux/stores';
import {uStateUser} from '@redux/stores/selection';
import {FetchNotification} from '@services/notification.service';
import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

export function useFetchNotification({
  page,
  size,
}: Pick<Paging, 'page' | 'size'>) {
  const {isLogged} = useSelector<IRootState, UserState>(uStateUser);
  const [data, setData] = useState<ItemNotification[]>([]);

  const [paging, setPaging] = useState<Paging>({
    page,
    size,
    totalElement: 0,
    totalPages: 0,
  });

  const onSuccess = useCallback(
    ({data: {data, ...props}}: AxiosResponse<any>) => {
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
    AxiosResponse<DataList<ItemNotification[]>>,
    Error,
    Pick<Paging, 'page' | 'size'>
  >({
    mutationKey: ['fetchNotification', {page: paging.page, size: paging.size}],
    mutationFn: FetchNotification,
    onSuccess: onSuccess,
  });

  useEffect(() => {
    isLogged && mutate({page: paging.page, size: paging.size});
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
    onRefresh,
    onEndReached,
  };
}
