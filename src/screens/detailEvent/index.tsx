import Color from '@theme/Color';
import {memo, useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from './components/Header';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {Block, ButtonGradient, Image, Text} from '@components';
import {HEIGHT_COVER} from './layout';
import {getSize} from '@base/common/responsive';
import UserJoined from '@screens/home/components/UserJoined';
import Font from '@theme/Font';
import Styles from '@base/common/styles';
import CalendarIcon from '@assets/icons/detailEvent/CalendarIcon';
import LocationIcon from '@assets/icons/detailEvent/LocationIcon';
import Images from '@assets/images';
import Footer from './components/Footer';
import {navigate} from '@navigation/navigationService';
import {PROFILE_OWNER_EVENT_SCREEN} from '@navigation/routes';

const DetailEventScreen = () => {
  const {top} = useSafeAreaInsets();
  const scrollY = useSharedValue<number>(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {y}}) => {
      scrollY.value = y;
    },
  });

  const handleProfileOwner = useCallback(() => {
    navigate(PROFILE_OWNER_EVENT_SCREEN);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <Header top={top} scrollY={scrollY} />
      <Animated.ScrollView
        onScroll={onScroll}
        contentContainerStyle={styles.contentContainerStyle}>
        <Block style={styles.boxInvite}>
          <UserJoined
            styleText={styles.textGoing}
            style={styles.imageUser}
            translateX={getSize.m(14)}
          />
          <ButtonGradient isRightIcon={false} style={styles.btnInvite}>
            <Text>Invite</Text>
          </ButtonGradient>
        </Block>
        <Block style={Styles.paddingHorizontal}>
          <Text style={styles.title}>Acoustic Night - Tweendee</Text>
          <Block row alignCenter marginBottom={20}>
            <Block style={styles.boxIcon}>
              <CalendarIcon />
            </Block>
            <Block flex>
              <Text numberOfLines={1} style={styles.textTitleInfo}>
                20/10/2024
              </Text>
              <Text numberOfLines={1} style={styles.textSubInfo}>
                Tuesday, 4:00PM - 9:00PM
              </Text>
            </Block>
          </Block>
          <Block row alignCenter marginBottom={20}>
            <Block style={styles.boxIcon}>
              <LocationIcon />
            </Block>
            <Block flex>
              <Text numberOfLines={1} style={styles.textTitleInfo}>
                Location
              </Text>
              <Text numberOfLines={1} style={styles.textSubInfo}>
                Sub Location
              </Text>
            </Block>
          </Block>
          <Block row alignCenter marginBottom={30}>
            <TouchableOpacity
              onPress={handleProfileOwner}
              activeOpacity={0.5}
              style={styles.contentUser}>
              <Image source={Images.AVATAR} style={styles.boxIcon} />
              <Block row flex alignCenter>
                <Block flex>
                  <Text numberOfLines={1} style={styles.textTitleInfo}>
                    Location
                  </Text>
                  <Text numberOfLines={1} style={styles.textSubInfo}>
                    Sub Location
                  </Text>
                </Block>
              </Block>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnFollow} activeOpacity={0.5}>
              <Text style={styles.textFollow}>Follow</Text>
            </TouchableOpacity>
          </Block>
          <Text style={styles.textAboutEvent}>About Event</Text>
          <Text style={styles.textDescription}>
            You can use the KeyboardAwareScrollView, KeyboardAwareSectionList or
            the KeyboardAwareFlatList components. They accept ScrollView,
            SectionList and FlatList default props respectively and implement a
            custom high order component called KeyboardAwareHOC to handle
            keyboard appearance. The high order component is also available if
            you want to use it in any other component. First, Android natively
            has this feature, you can easily enable it by setting
            windowSoftInputMode in AndroidManifest.xml. Check here. But if you
            want to use feature like extraHeight, you need to enable Android
            Support with the following steps: Make sure you are using
            react-native 0.46 or above. Set windowSoftInputMode to adjustPan in
            AndroidManifest.xml. Set enableOnAndroid property to true. Android
            Support is not perfect, here is the supported list:
          </Text>
        </Block>
      </Animated.ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.BACKGROUND,
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: HEIGHT_COVER - getSize.m(30),
    paddingBottom: getSize.v(120),
  },
  boxInvite: {
    backgroundColor: '#29313E',
    height: getSize.m(60),
    marginHorizontal: getSize.s(40),
    borderRadius: getSize.m(30),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: getSize.s(12),
    justifyContent: 'space-between',
  },
  imageUser: {
    width: getSize.m(34),
    height: getSize.m(34),
    borderRadius: getSize.m(17),
  },
  textGoing: {
    color: '#38BFDD',
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_medium_500,
    transform: [{translateX: -getSize.m(22)}],
  },
  btnInvite: {
    height: getSize.m(34),
    paddingHorizontal: getSize.s(20),
    borderRadius: getSize.m(8),
  },
  title: {
    fontSize: getSize.m(24, 0.3),
    fontFamily: Font.font_regular_400,
    marginTop: getSize.m(20),
    marginBottom: getSize.m(40),
  },
  boxIcon: {
    width: getSize.m(48),
    height: getSize.m(48),
    borderRadius: getSize.m(12),
    backgroundColor: `${Color.WHITE}10`,
    ...Styles.centerNoFlex,
    marginRight: getSize.m(12),
  },
  textTitleInfo: {
    fontFamily: Font.font_medium_500,
    fontSize: getSize.m(16, 0.3),
    marginBottom: getSize.m(6),
  },
  textSubInfo: {
    fontSize: getSize.m(12, 0.3),
    fontFamily: Font.font_light_200,
  },
  btnFollow: {
    height: getSize.m(32),
    backgroundColor: `${Color.WHITE}30`,
    justifyContent: 'center',
    borderRadius: getSize.m(8),
    paddingHorizontal: getSize.m(12),
  },
  textFollow: {
    fontSize: getSize.m(12, 0.3),
    fontFamily: Font.font_regular_400,
  },
  textAboutEvent: {
    fontFamily: Font.font_medium_500,
    fontSize: getSize.m(18, 0.3),
    marginBottom: getSize.m(12),
  },
  textDescription: {
    fontSize: getSize.m(16, 0.3),
    fontFamily: Font.font_thin_100,
    lineHeight: getSize.m(24),
  },
  contentUser: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});

export default DetailEventScreen;
