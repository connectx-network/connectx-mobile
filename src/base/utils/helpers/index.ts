import axios from 'axios';
import {Alert, Platform, ToastAndroid} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Helper = {
  getDataStored: (value: string) => {
    return AsyncStorage.getItem(value);
  },
  storeData: (key: string, value: string) => {
    return AsyncStorage.setItem(key, value);
  },
  removeDataStored: (key?: string) => {
    if (key) {
      return AsyncStorage.removeItem(key);
    }
    return AsyncStorage.clear();
  },
  getHitSlop: (value: number = 5) => {
    return {top: value, right: value, bottom: value, left: value};
  },
  formatNumberWith(number: number, character: string = '.') {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, character);
  },
  showAlert: (message: string) => {
    if (Platform.OS === 'ios') {
      Alert.alert('', message);
    } else {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  },
  getTime: (time: number) => {
    let hour = Math.floor(time / 60);
    let minute =
      time % 60 === 0
        ? '00'
        : Math.round((time / 60 - Math.floor(time / 60)) * 60);

    return `${hour}:${minute}`;
  },
  isOpen: (open: number, close: number) => {
    const date = new Date();
    let hours = date.getHours() * 60;
    if (open < hours && hours < close) {
      return true;
    }
    return false;
  },
  getAxiosErrorMessage: (error: any) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        return error.response?.data?.message;
      }
    }
    return error;
  },
};

export default Helper;

export interface AxiosServerError {
  message: string;
}
