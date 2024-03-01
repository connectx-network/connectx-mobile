import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {keyExtractor} from '@base/utils/Utils';
import {Block} from '@components';
import {Event} from '@model/event';
import {useFetchEvents} from '@screens/events/hooks';
import ItemEventNear from '@screens/home/Items/ItemEventNear';
import Color from '@theme/Color';
import {Fragment, memo, useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {searchMapControl} from './SearchContainer';
import {HEIGHT_SEARCH_MAP} from './components/SearchBar';

const heightSearch = HEIGHT_SEARCH_MAP + getSize.v(8);

const MapSearch = () => {
  const {top} = useSafeAreaInsets();
  const {data} = useFetchEvents({page: 1, size: 10});

  const renderItem = useCallback(({item}: {item: Event}) => {
    return <ItemEventNear {...item} />;
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
