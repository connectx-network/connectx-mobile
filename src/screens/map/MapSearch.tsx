import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {keyExtractor} from '@base/utils/Utils';
import {Block} from '@components';
import {Event} from '@model/event';
import ItemEventNear from '@screens/home/Items/ItemEventNear';
import Color from '@theme/Color';
import {FC, Fragment, memo, useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Region} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {mapControlRef} from './MapHome';
import {searchMapControl} from './SearchContainer';
import {HEIGHT_SEARCH_MAP} from './components/SearchBar';

interface IProps {
  data: Event[];
}

const heightSearch = HEIGHT_SEARCH_MAP + getSize.v(8);

const MapSearch: FC<IProps> = ({data}) => {
  const {top} = useSafeAreaInsets();

  const renderItem = useCallback(({item}: {item: Event}) => {
    const handleItem = () => {
      searchMapControl.hideSearch();
      const region: Region = {
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
        latitude: Number(item.eventLocationDetail.latitude),
        longitude: Number(item.eventLocationDetail.longitude),
      };
      mapControlRef.navigator(region);
    };
    return <ItemEventNear handleItem={handleItem} {...item} />;
  }, []);

  const onScrollBeginDrag = useCallback(() => {
    searchMapControl.onBlur();
  }, []);

  return (
    <Fragment>
      <Block style={[styles.bgTabBar, {height: top + heightSearch}]} />
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{paddingTop: top + heightSearch}}
        style={styles.list}
        onScrollBeginDrag={onScrollBeginDrag}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  bgTabBar: {
    position: 'absolute',
    width: WIDTH_SCREEN,
    backgroundColor: Color.BACKGROUND,
    zIndex: 90,
  },
  list: {
    marginTop: getSize.v(12),
  },
});

export default memo(MapSearch);
