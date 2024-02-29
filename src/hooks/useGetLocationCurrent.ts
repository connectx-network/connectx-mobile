import {Coord, Position} from '@model/map';
import Geolocation from '@react-native-community/geolocation';
import {useCallback, useEffect, useState} from 'react';
import Geocoder from 'react-native-geocoder';
import {useAppState} from './useAppState';
import {AppStateStatus} from 'react-native';
import {useRefreshOnFocus} from './useRefreshOnFocus';
import Helper from '@base/utils/helpers';
import {POSITION_DATA} from '@base/common/constants';

const key = 'AIzaSyAeX--9sLa-_Bl9vxnj6uBOHOBllS6hmUQ';

export function useGetLocationCurrent() {
  const [isAllowPermission, setAllowPermission] = useState<boolean>(false);
  const [coord, setCoord] = useState<Coord | null>(null);
  const [position, setPosition] = useState<Position | null>(null);

  const fetchLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      (position: any) => {
        setAllowPermission(true);
        setCoord(position.coords);
        const NY = {
          lat: position.coords?.latitude,
          lng: position.coords?.longitude,
        };
        Geocoder.fallbackToGoogle(key);
        Geocoder.geocodePosition(NY)
          .then(res => {
            setPosition(res?.[0]);
            res?.[0] &&
              Helper.storeData(POSITION_DATA, JSON.stringify(res?.[0]));
          })
          .catch(async () => {
            const dataPosition = await Helper.getDataStored(POSITION_DATA);
            if (dataPosition) {
              setPosition(JSON.parse(dataPosition));
            }
          });
      },
      () => {
        setAllowPermission(false);
      },
      {enableHighAccuracy: false},
    );
  }, []);

  const onAppStateChange = useCallback(
    (status: AppStateStatus) => {
      if (status === 'active') {
        fetchLocation();
      }
    },
    [fetchLocation],
  );

  useAppState(onAppStateChange);

  useEffect(() => {
    fetchLocation();
  }, []);
  return {coord, isAllowPermission, position};
}
