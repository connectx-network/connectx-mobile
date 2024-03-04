import {IS_IOS} from '@base/common/constants';
import {getSize} from '@base/common/responsive';
import {keyExtractor} from '@base/utils/Utils';
import {Text} from '@components';
import {Event} from '@model/event';
import {useFetchEvents} from '@screens/events/hooks';
import ItemEventNear from '@screens/home/Items/ItemEventNear';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FC, memo, useCallback} from 'react';
import {RefreshControl, StyleSheet} from 'react-native';
import {Tabs} from 'react-native-collapsible-tab-view';

interface IProps {
  scrollEnabled: boolean;
  userId?: string;
}

const EventTab: FC<IProps> = ({scrollEnabled, userId}) => {
  const {data, isLoading, onRefresh, onEndReached} = useFetchEvents({
    page: 1,
    size: 10,
    userId,
  });

  const renderItem = useCallback(({item}: {item: Event}) => {
    return <ItemEventNear {...item} />;
  }, []);

  const listEmptyComponent = useCallback(() => {
    return <Text style={styles.textEmpty}>There are no reviews yet</Text>;
  }, []);

  return (
    <Tabs.FlatList
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={onRefresh}
          tintColor={Color.WHITE}
          titleColor={Color.WHITE}
          size={IS_IOS ? getSize.m(22) : undefined}
        />
      }
      scrollEnabled={scrollEnabled}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainerStyle}
      ListEmptyComponent={listEmptyComponent}
      onEndReached={onEndReached}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: getSize.m(20),
    paddingTop: getSize.m(20),
  },
  textEmpty: {
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_medium_500,
    textAlign: 'center',
    color: `${Color.WHITE}80`,
    marginTop: getSize.v(12),
  },
});

export default memo(EventTab);
