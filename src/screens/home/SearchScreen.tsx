import {IconApp} from '@assets/icons';
import SearchGradientIcon from '@assets/icons/home/SearchGradientIcon';
import SearchIcon from '@assets/icons/home/SearchIcon';
import {getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {keyExtractor} from '@base/utils/Utils';
import {Block, ButtonGradient, TabBar, Text} from '@components';
import {SearchScreenRouteProp} from '@navigation/routes';
import {BSFilterControl} from '@screens/filter';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FC, useCallback} from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ItemEventNear from './Items/ItemEventNear';

interface IProps {
  route: SearchScreenRouteProp;
}

const SearchScreen: FC<IProps> = ({route: {params}}) => {
  const handleFilter = useCallback(() => {
    Keyboard.dismiss();
    BSFilterControl.show();
  }, []);

  const renderItem = useCallback(() => {
    return <ItemEventNear />;
  }, []);

  return (
    <SafeAreaView style={Styles.container} edges={[]}>
      <TabBar
        title="Search"
        hideRightIcon
        styleContainer={StyleSheet.flatten([
          styles.tabBar,
          {height: params.heightTabBar - params.heightSearch},
        ])}
      />
      <Block style={styles.actionBar}>
        <SearchGradientIcon />
        <TextInput
          style={styles.inputSearch}
          placeholderTextColor={`${Color.WHITE}30`}
          placeholder="Search..."
          autoFocus
        />
        <ButtonGradient
          isRightIcon={false}
          onPress={handleFilter}
          activeOpacity={0.5}
          style={styles.btnFilter}>
          <IconApp
            color={Color.WHITE}
            name={'Group-18240'}
            size={getSize.m(24)}
          />
          <Text style={styles.textFilter}>Filters</Text>
        </ButtonGradient>
      </Block>
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
  tabBar: {
    alignItems: 'flex-end',
    paddingBottom: getSize.m(20),
  },
  actionBar: {
    flexDirection: 'row',
    paddingHorizontal: getSize.s(20),
    alignItems: 'center',
    paddingBottom: getSize.m(12),
  },
  inputSearch: {
    flex: 1,
    marginHorizontal: getSize.m(12),
    fontSize: getSize.m(20, 0.3),
    fontFamily: Font.font_regular_400,
  },
  btnFilter: {
    height: getSize.m(32),
    borderRadius: getSize.m(16),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.WHITE,
    paddingHorizontal: getSize.m(4),
  },
  textFilter: {
    fontSize: getSize.m(12, 0.3),
    fontFamily: Font.font_regular_400,
    marginHorizontal: getSize.m(4),
  },
  contentContainerStyle: {
    paddingTop: getSize.m(20),
  },
});

export default SearchScreen;
