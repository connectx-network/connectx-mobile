import AutoCurrentIcon from '@assets/icons/map/AutoCurrentIcon';
import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {keyExtractor} from '@base/utils/Utils';
import {Block} from '@components';
import {useGetLocationCurrent} from '@hooks/useGetLocationCurrent';
import {Event} from '@model/event';
import {useFetchEvents} from '@screens/events/hooks';
import ItemEventNear from '@screens/home/Items/ItemEventNear';
import Color from '@theme/Color';
import {FC, Fragment, useCallback, useRef} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';
import MarkerCustom from './components/MarkerCustom';

interface IProps {
  region: Region;
  onRegionChange: (region: Region) => void;
}

const MARKER = [
  {
    title: 'event1',
    description: 'test',
    coordinate: {
      latitude: 21.027518812382848,
      longitude: 105.78320091585685,
    },
  },
  {
    title: 'event2',
    description: 'test',
    coordinate: {
      latitude: 21.028872980713523,
      longitude: 105.78542389264247,
    },
  },
];

const MapHome: FC<IProps> = ({region, onRegionChange}) => {
  const {data} = useFetchEvents({page: 1, size: 10});
  const refMap = useRef<MapView>(null);
  const {coord} = useGetLocationCurrent();

  const renderItem = useCallback(({item}: {item: Event}) => {
    return <ItemEventNear {...item} style={styles.itemEvent} />;
  }, []);

  const handleCurrentLocation = useCallback(() => {
    if (coord?.latitude && coord?.longitude) {
      const region: Region = {
        latitudeDelta: 0,
        longitudeDelta: 0,
        latitude: coord.latitude,
        longitude: coord.longitude,
      };
      refMap.current?.animateToRegion(region, 1000);
    }
  }, [coord?.latitude, coord?.longitude]);

  return (
    <Fragment>
      <MapView
        ref={refMap}
        provider={PROVIDER_GOOGLE}
        style={Styles.root}
        initialRegion={{
          latitude: 21.027518812382848,
          longitude: 105.78320091585685,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChange={onRegionChange}>
        {MARKER.map((item, index) => {
          return <MarkerCustom {...item} key={index} />;
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
};

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
