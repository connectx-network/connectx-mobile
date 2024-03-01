import {getSize} from '@base/common/responsive';
import {keyExtractor} from '@base/utils/Utils';
import ItemEventNear from '@screens/home/Items/ItemEventNear';
import {FC, memo, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Tabs} from 'react-native-collapsible-tab-view';
import ItemReview from './Items/ItemReview';
import {Text} from '@components';
import Font from '@theme/Font';
import Color from '@theme/Color';

interface IProps {
  scrollEnabled: boolean;
}

const ReviewsTab: FC<IProps> = ({scrollEnabled}) => {
  const renderItem = useCallback(() => {
    return <ItemReview />;
  }, []);

  const listEmptyComponent = useCallback(() => {
    return <Text style={styles.textEmpty}>There are no reviews yet</Text>;
  }, []);

  return (
    <Tabs.FlatList
      scrollEnabled={scrollEnabled}
      data={Array.from(Array(0).keys())}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainerStyle}
      ListEmptyComponent={listEmptyComponent}
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

export default memo(ReviewsTab);
