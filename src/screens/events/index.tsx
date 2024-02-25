import {getSize} from '@base/common/responsive';
import {keyExtractor} from '@base/utils/Utils';
import ItemEventNear from '@screens/home/Items/ItemEventNear';
import Color from '@theme/Color';
import {useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from './components/Header';

const EventsScreen = () => {
  const renderItem = useCallback(() => {
    return <ItemEventNear />;
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        windowSize={8}
        contentContainerStyle={styles.contentContainerStyle}
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
