import {IDetailEvent} from '@model/event';
import {FetchDetailEvent} from '@services/event.service';
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
