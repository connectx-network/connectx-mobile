import {Icon, IconApp} from '@assets/icons';
import NotifyIcon from '@assets/icons/home/NotifyIcon';
import SearchIcon from '@assets/icons/home/SearchIcon';
import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {Block, Text} from '@components';
import {navigate, openDrawer} from '@navigation/navigationService';
import {NOTIFICATION_SCREEN, SEARCH_SCREEN} from '@navigation/routes';
import {BSFilterControl} from '@screens/filter';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FC, useCallback, useState} from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface IProps {
  paddingTop: number;
  scrollY: SharedValue<number>;
  onLayoutTabBar: (event: LayoutChangeEvent) => void;
  heightTabBar: number;
  address?: string;
}

const Header: FC<IProps> = ({
  paddingTop,
  scrollY,
  onLayoutTabBar,
  heightTabBar,
  address,
}) => {
  const [heightSearch, setHeightSearch] = useState<number>(0);

  const handleNotify = useCallback(() => {
    navigate(NOTIFICATION_SCREEN);
  }, []);

  const handleFilter = useCallback(() => {
    BSFilterControl.show();
  }, []);

  const handleLayoutSearch = useCallback(
    ({nativeEvent: {layout}}: LayoutChangeEvent) => {
      setHeightSearch(layout.height);
    },
    [],
  );

  const styleSearch = useAnimatedStyle(() => {
    if (!heightSearch) {
      return {};
    }
    const translateY = interpolate(
      scrollY.value,
      [0, 80],
      [0, -heightSearch],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      scrollY.value,
      [0, 80],
      [1, 0],
      Extrapolation.CLAMP,
    );
    return {transform: [{translateY}], opacity};
  }, [heightSearch]);

  // const styleTabBar = useAnimatedStyle(() => {
  //   if (!heightSearch) {
  //     return {};
  //   }
  //   const translateY = interpolate(
  //     scrollY.value,
  //     [0, 80],
  //     [0, -heightSearch],
  //     Extrapolation.CLAMP,
  //   );
  //   return {transform: [{translateY: translateY}]};
  // }, [heightSearch]);

  const handleSearch = useCallback(() => {
    navigate(SEARCH_SCREEN, {heightSearch, heightTabBar});
  }, [heightSearch, heightTabBar]);

  return (
    <Block onLayout={onLayoutTabBar} style={[styles.root, {paddingTop}]}>
      <Animated.View
        style={[
          styles.contentLiner,
          // styleTabBar
        ]}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#5669FF', '#BF56FF']}
          style={StyleSheet.flatten([styles.container, {height: heightTabBar}])}
        />
      </Animated.View>
      <Block style={styles.tabBar}>
        <TouchableOpacity activeOpacity={0.5} onPress={openDrawer}>
          <IconApp name={'menu'} color={Color.WHITE} size={getSize.m(22)} />
        </TouchableOpacity>
        <Block style={styles.content}>
          <Block row alignCenter>
            <Text style={styles.textTitleLocation}>Current Location</Text>
            <Icon
              name={'caret-down-outline'}
              color={Color.WHITE}
              size={getSize.m(16)}
            />
          </Block>
          <Text numberOfLines={1} style={styles.textLocation}>
            {address || 'Location not determined'}
          </Text>
        </Block>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleNotify}
          style={styles.iconNotify}>
          <NotifyIcon />
        </TouchableOpacity>
      </Block>
      {false && (
        <Animated.View
          onLayout={handleLayoutSearch}
          style={[styles.actionBar, styleSearch]}>
          <Pressable style={styles.btnSearch} onPress={handleSearch}>
            <SearchIcon />
            <Text
              style={styles.inputSearch}
              // placeholderTextColor={`${Color.BACKGROUND}60`}
              // placeholder="Search..."
              // onFocus={handleSearch}
            >
              Search...
            </Text>
          </Pressable>

          {false && (
            <TouchableOpacity
              onPress={handleFilter}
              activeOpacity={0.5}
              style={styles.btnFilter}>
              <IconApp
                color={'#A29EF0'}
                name={'Group-18240'}
                size={getSize.m(24)}
              />
              <Text style={styles.textFilter}>Filters</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    width: WIDTH_SCREEN,
    zIndex: 100,
  },
  contentLiner: {
    position: 'absolute',
    width: WIDTH_SCREEN,
  },
  container: {
    borderBottomLeftRadius: getSize.m(30),
    borderBottomRightRadius: getSize.m(30),
    position: 'absolute',
    width: WIDTH_SCREEN,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getSize.s(20),
    justifyContent: 'space-between',
    marginBottom: getSize.m(20),
    zIndex: 100,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: getSize.s(20),
    marginLeft: getSize.m(14),
  },
  iconNotify: {
    width: getSize.m(36),
    height: getSize.m(36),
    borderRadius: getSize.m(18),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${Color.BACKGROUND}20`,
  },
  textTitleLocation: {
    fontSize: getSize.m(12, 0.3),
    fontFamily: Font.font_regular_400,
    marginRight: getSize.m(4),
  },
  textLocation: {
    fontSize: getSize.m(13, 0.3),
    fontFamily: Font.font_medium_500,
  },
  actionBar: {
    flexDirection: 'row',
    paddingHorizontal: getSize.s(20),
    alignItems: 'center',
    paddingBottom: getSize.m(20),
  },
  inputSearch: {
    flex: 1,
    marginHorizontal: getSize.m(12),
    fontSize: getSize.m(20, 0.3),
    fontFamily: Font.font_regular_400,
    color: `${Color.BACKGROUND}60`,
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
    color: Color.BACKGROUND,
    marginHorizontal: getSize.m(4),
  },
  btnSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});

export default Header;
