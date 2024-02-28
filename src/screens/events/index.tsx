import {getSize} from '@base/common/responsive';
import {keyExtractor} from '@base/utils/Utils';
import ItemEventNear from '@screens/home/Items/ItemEventNear';
import Color from '@theme/Color';
import {useCallback, useEffect} from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from './components/Header';
import {useFetchEvents} from './hooks';
import {Event} from '@model/event';
import {IS_IOS} from '@base/common/constants';

const EventsScreen = () => {
  const {data, isLoading, onEndReached, onRefresh} = useFetchEvents({
    page: 1,
    size: 10,
  });

  const renderItem = useCallback(({item}: {item: Event}) => {
    return <ItemEventNear {...item} />;
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            tintColor={Color.WHITE}
            titleColor={Color.WHITE}
            size={IS_IOS ? getSize.m(22) : undefined}
          />
        }
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        windowSize={8}
        contentContainerStyle={styles.contentContainerStyle}
        onEndReached={onEndReached}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND,
  },
  contentContainerStyle: {
    paddingTop: getSize.m(20),
  },
});

export default EventsScreen;
