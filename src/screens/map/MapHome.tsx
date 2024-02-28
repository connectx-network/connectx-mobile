import Styles from '@base/common/styles';
import {FC, Fragment, useCallback} from 'react';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';
import MarkerCustom from './components/MarkerCustom';
import {Block} from '@components';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import Color from '@theme/Color';
import {keyExtractor} from '@base/utils/Utils';
import ItemEventNear from '@screens/home/Items/ItemEventNear';
import AutoCurrentIcon from '@assets/icons/map/AutoCurrentIcon';

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
  {
    title: 'event3',
    description: 'test',
    coordinate: {
      latitude: 21.025476615914478,
      longitude: 105.78557599106522,
    },
  },
  {
    title: 'event4',
    description: 'test',
    coordinate: {
      latitude: 21.028726859155988,
      longitude: 105.78178616379164,
    },
  },
];

const MapHome: FC<IProps> = ({region, onRegionChange}) => {
  const renderItem = useCallback(() => {
    return <ItemEventNear style={styles.itemEvent} />;
  }, []);

  return (
    <Fragment>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={Styles.root}
        initialRegion={region}
        onRegionChange={onRegionChange}>
        {MARKER.map((item, index) => {
          return <MarkerCustom {...item} key={index} />;
        })}
      </MapView>
      <Block style={styles.content}>
        <TouchableOpacity style={styles.btnAutoCurrent} activeOpacity={0.5}>
          <AutoCurrentIcon />
        </TouchableOpacity>
        <FlatList
          data={Array.from(Array(10).keys())}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          snapToOffsets={Array.from(Array(10).keys()).map(
            (item, index) =>
              item * (WIDTH_SCREEN - getSize.s(40)) + index * getSize.s(6),
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
