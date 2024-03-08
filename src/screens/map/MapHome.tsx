import AutoCurrentIcon from '@assets/icons/map/AutoCurrentIcon';
import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {keyExtractor} from '@base/utils/Utils';
import {Block} from '@components';
import {useGetLocationCurrent} from '@hooks/useGetLocationCurrent';
import {Event} from '@model/event';
import ItemEventNear from '@screens/home/Items/ItemEventNear';
import Color from '@theme/Color';
import {
  Fragment,
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';
import MarkerCustom from './components/MarkerCustom';
import MarkerSelf from './components/MarkerSelf';

export const refMap = createRef<any>();

export const mapControlRef = {
  navigator: (region: Region) => refMap.current?.navigator(region),
};

interface IProps {
  data: Event[];
}

const MapHome = forwardRef(({data}: IProps, ref) => {
  const refMapView = useRef<MapView>(null);
  const {coord} = useGetLocationCurrent();

  const navigator = useCallback((region: Region) => {
    refMapView.current?.animateToRegion(region, 1000);
  }, []);

  useImperativeHandle(ref, () => ({navigator}));

  const renderItem = useCallback(({item}: {item: Event}) => {
    const handleItem = () => {
      const region: Region = {
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
        latitude: Number(item.eventLocationDetail.latitude),
        longitude: Number(item.eventLocationDetail.longitude),
      };
      refMapView.current?.animateToRegion(region, 1000);
    };
    return (
      <ItemEventNear
        handleItem={handleItem}
        {...item}
        style={styles.itemEvent}
      />
    );
  }, []);

  const handleCurrentLocation = useCallback(() => {
    if (coord?.latitude && coord?.longitude) {
      const region: Region = {
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
        latitude: coord.latitude,
        longitude: coord.longitude,
      };
      refMapView.current?.animateToRegion(region, 1000);
    }
  }, [coord?.latitude, coord?.longitude]);

  useEffect(() => {
    handleCurrentLocation();
  }, [coord]);

  return (
    <Fragment>
      <MapView
        ref={refMapView}
        provider={PROVIDER_GOOGLE}
        style={Styles.root}
        initialRegion={{
          latitude: 21.027518812382848,
          longitude: 105.78320091585685,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {coord && (
          <MarkerSelf latitude={coord.latitude} longitude={coord.longitude} />
        )}
        {data.map((item, index) => {
          return (
            <MarkerCustom
              coordinate={{
                latitude: Number(item.eventLocationDetail.latitude),
                longitude: Number(item.eventLocationDetail.longitude),
              }}
              banner={item.eventAssets?.[0]?.url}
              key={index}
            />
          );
        })}
      </MapView>
      <Block style={styles.content}>
        {!!coord && (
          <TouchableOpacity
            onPress={handleCurrentLocation}
            style={styles.btnAutoCurrent}
            activeOpacity={0.5}>
            <AutoCurrentIcon />
          </TouchableOpacity>
        )}
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          snapToOffsets={data.map(
            (_, index) =>
              index * (WIDTH_SCREEN - getSize.s(40)) + index * getSize.s(6),
          )}
          decelerationRate={'fast'}
        />
      </Block>
    </Fragment>
  );
});

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    width: WIDTH_SCREEN,
    bottom: 0,
  },
  btnAutoCurrent: {
    backgroundColor: Color.WHITE,
    width: getSize.m(52),
    height: getSize.m(52),
    borderRadius: getSize.m(26),
    ...Styles.centerNoFlex,
    shadowColor: Color.BACKGROUND,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: getSize.m(4),
    shadowOpacity: 0.3,
    elevation: 4,
    alignSelf: 'flex-end',
    marginRight: getSize.s(20),
    marginBottom: getSize.v(20),
  },
  itemEvent: {
    marginBottom: getSize.v(8),
    width: WIDTH_SCREEN - getSize.s(40),
    marginRight: getSize.s(6),
    marginLeft: 0,
  },
  contentContainerStyle: {
    paddingLeft: getSize.s(20),
    paddingRight: getSize.s(14),
  },
});

export default MapHome;
