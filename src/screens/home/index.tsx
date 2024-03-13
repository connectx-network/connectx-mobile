import {Icon} from '@assets/icons';
import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {keyExtractor} from '@base/utils/Utils';
import {Block, Text} from '@components';
import {useGetLocationCurrent} from '@hooks/useGetLocationCurrent';
import {Event} from '@model/event';
import {useFetchEvents} from '@screens/events/hooks';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {TColors} from '@theme/Theme';
import {useStyle} from '@theme/useStyle';
import {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import ItemEvent from './Items/ItemEvent';
import ItemEventNear from './Items/ItemEventNear';
import Banner from './components/Banner';
import Header from './components/Header';

const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const scrollY = useSharedValue<number>(0);
  const scrollView = useAnimatedRef<Animated.ScrollView>();
  const [heightTabBar, setHeightTabBar] = useState<number>(0);
  const {position} = useGetLocationCurrent();
  const {data} = useFetchEvents({page: 1, size: 10});
  const styles = useStyle(getStyles);

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {y}}) => {
      scrollY.value = y;
    },
  });

  const renderItemEvent = useCallback(({item}: {item: Event}) => {
    return <ItemEvent {...item} />;
  }, []);

  const renderItemEventNear = useMemo(() => {
    return data.map((item: Event, index) => (
      <ItemEventNear {...item} key={index} />
    ));
  }, [data]);

  const onLayoutTabBar = useCallback(
    ({nativeEvent: {layout}}: LayoutChangeEvent) => {
      setHeightTabBar(layout.height);
    },
    [],
  );

  // const onScrollEndDrag = useCallback(() => {
  //   if (scrollY.value > 40 && scrollY.value < 80) {
  //     scrollView.current?.scrollTo({
  //       y: 80,
  //       animated: true,
  //     });
  //   } else {
  //     if (scrollY.value < 40 && scrollY.value > 0) {
  //       scrollView.current?.scrollTo({
  //         y: 0,
  //         animated: true,
  //       });
  //     }
  //   }
  // }, []);

  return (
    <SafeAreaView edges={[]} style={styles.container}>
      <Header
        paddingTop={top}
        scrollY={scrollY}
        onLayoutTabBar={onLayoutTabBar}
        heightTabBar={heightTabBar}
        address={position?.formattedAddress}
      />
      <Animated.ScrollView
        ref={scrollView}
        onScroll={onScroll}
        // onScrollEndDrag={onScrollEndDrag}
        contentContainerStyle={{
          paddingTop: heightTabBar,
        }}>
        <Block style={styles.label}>
          <Text style={styles.textLabel}>Upcoming Events</Text>
          {false && (
            <TouchableOpacity activeOpacity={0.5} style={styles.seeAll}>
              <Text style={styles.textSeeAll}>See All</Text>
              <Icon
                name={'caret-forward-outline'}
                color={Color.WHITE}
                size={getSize.m(14)}
              />
            </TouchableOpacity>
          )}
        </Block>

        <FlatList
          horizontal
          data={data}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItemEvent}
          contentContainerStyle={styles.contentContainerStyle}
          decelerationRate={'fast'}
          snapToOffsets={data.map(
            (_, index) =>
              (index + 1) * (WIDTH_SCREEN * 0.65) +
              index * getSize.s(12) +
              getSize.s(20),
          )}
        />

        <Banner />

        <Block style={styles.label}>
          <Text style={styles.textLabel}>Near You</Text>
          {false && (
            <TouchableOpacity activeOpacity={0.5} style={styles.seeAll}>
              <Text style={styles.textSeeAll}>See All</Text>
              <Icon
                name={'caret-forward-outline'}
                color={Color.WHITE}
                size={getSize.m(14)}
              />
            </TouchableOpacity>
          )}
        </Block>
        {renderItemEventNear}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.mainBackground,
      flex: 1,
    },
    label: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: getSize.v(25),
      marginHorizontal: getSize.s(20),
      justifyContent: 'space-between',
      marginBottom: getSize.v(8),
    },
    seeAll: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textLabel: {
      fontSize: getSize.m(18, 0.3),
      fontFamily: Font.font_medium_500,
      color: colors.mainForeground,
    },
    textSeeAll: {
      fontSize: getSize.m(14, 0.3),
      fontFamily: Font.font_regular_400,
    },
    contentContainerStyle: {
      paddingLeft: getSize.s(20),
    },
  });

export default HomeScreen;
