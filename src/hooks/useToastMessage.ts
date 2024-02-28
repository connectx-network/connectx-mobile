import {capitalizeFirstLetter} from '@base/utils/Utils';
import {useCallback} from 'react';
import {useToast} from 'react-native-toast-notifications';

export function useToastMessage() {
  const toast = useToast();

  const showWarningTop = useCallback(
    (message: string, time?: number) => {
      toast.show(capitalizeFirstLetter(message), {
        duration: time || 2500,
        type: 'warning',
        placement: 'top',
      });
    },
    [toast],
  );

  const showWarningBottom = useCallback(
    (message: string, time?: number) => {
      toast.show(capitalizeFirstLetter(message), {
        duration: time || 2500,
        type: 'warning',
        placement: 'bottom',
      });
    },
    [toast],
  );

  const showWarningCenter = useCallback(
    (message: string, time?: number) => {
      toast.show(capitalizeFirstLetter(message), {
        duration: time || 2500,
        type: 'warning',
        placement: 'center',
      });
    },
    [toast],
  );

  const showSuccessCenter = useCallback(
    (message: string, time?: number) => {
      toast.show(capitalizeFirstLetter(message), {
        duration: time || 2500,
        type: 'success',
        placement: 'center',
      });
    },
    [toast],
  );
  const showSuccessTop = useCallback(
    (message: string, time?: number) => {
      toast.show(capitalizeFirstLetter(message), {
        duration: time || 2500,
        type: 'success',
        placement: 'top',
      });
    },
    [toast],
  );
  const showSuccessBottom = useCallback(
    (message: string, time?: number) => {
      toast.show(capitalizeFirstLetter(message), {
        duration: time || 2500,
        type: 'success',
        placement: 'bottom',
      });
    },
    [toast],
  );

  return {
    showWarningTop,
    showWarningBottom,
    showWarningCenter,
    showSuccessCenter,
    showSuccessTop,
    showSuccessBottom,
  };
}
