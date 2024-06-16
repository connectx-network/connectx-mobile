import Styles from '@base/common/styles';
import {keyExtractor} from '@base/utils/Utils';
import {TabBar} from '@components';
import {ItemNotification} from '@model/notification';
import {useTheme} from '@theme/Theme';
import {useCallback} from 'react';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ItemNotify from './Items/ItemNotify';
import NotifyEmpty from './components/NotifyEmpty';
import {useFetchNotification} from './hooks';

const NotificationScreen = () => {
  const {colors} = useTheme();
  const {data} = useFetchNotification({page: 1, size: 10});

  const renderItem = useCallback(({item}: {item: ItemNotification}) => {
    return <ItemNotify {...item} />;
  }, []);

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        Styles.root,
        {
          backgroundColor: colors.mainBackground,
        },
      ]}>
      <TabBar title="Notification" hideRightIcon />
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={<NotifyEmpty />}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;
