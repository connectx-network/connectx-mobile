import Styles from '@base/common/styles';
import {keyExtractor} from '@base/utils/Utils';
import {TabBar} from '@components';
import {useCallback} from 'react';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ItemNotify from './Items/ItemNotify';
import NotifyEmpty from './components/NotifyEmpty';

const NotificationScreen = () => {
  const renderItem = useCallback(() => {
    return <ItemNotify />;
  }, []);

  return (
    <SafeAreaView edges={['top']} style={Styles.container}>
      <TabBar title="Notification" />
      <FlatList
        data={Array.from(Array(10).keys())}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={<NotifyEmpty />}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;
