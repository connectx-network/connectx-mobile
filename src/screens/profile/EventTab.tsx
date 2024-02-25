import {getSize} from '@base/common/responsive';
import {keyExtractor} from '@base/utils/Utils';
import ItemEventNear from '@screens/home/Items/ItemEventNear';
import {memo, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Tabs} from 'react-native-collapsible-tab-view';

const EventTab = () => {
  const renderItem = useCallback(() => {
    return <ItemEventNear />;
  }, []);

  return (
    <Tabs.FlatList
      data={Array.from(Array(20).keys())}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: getSize.m(20),
    paddingTop: getSize.m(20),
  },
});

export default memo(EventTab);
