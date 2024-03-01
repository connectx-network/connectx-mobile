import Color from '@theme/Color';
import {FC, memo, useCallback, useState} from 'react';
import {Share, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from './components/Header';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {Block, ButtonGradient, Image, Text} from '@components';
import {HEIGHT_COVER} from './layout';
import {HEIGHT_SCREEN, getSize} from '@base/common/responsive';
import UserJoined from '@screens/home/components/UserJoined';
import Font from '@theme/Font';
import Styles from '@base/common/styles';
import CalendarIcon from '@assets/icons/detailEvent/CalendarIcon';
import LocationIcon from '@assets/icons/detailEvent/LocationIcon';
import Images from '@assets/images';
import Footer from './components/Footer';
import {navigate} from '@navigation/navigationService';
import {
  DetailEventScreenRouteProp,
  PROFILE_OWNER_EVENT_SCREEN,
} from '@navigation/routes';
import {useDetailEvent} from './hooks';
import moment from 'moment';
import {JoinEvent} from '@services/event.service';
import {useToastMessage} from '@hooks/useToastMessage';

interface IProps {
  route: DetailEventScreenRouteProp;
}

const DetailEventScreen: FC<IProps> = ({route: {params}}) => {
  const {top} = useSafeAreaInsets();
  const {showSuccessTop, showWarningTop} = useToastMessage();
  const scrollY = useSharedValue<number>(0);
  const {data} = useDetailEvent(params.id);
  const [isLoading, setLoading] = useState<boolean>(false);

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {y}}) => {
      scrollY.value = y;
    },
  });

  const handleProfileOwner = useCallback(() => {
    navigate(PROFILE_OWNER_EVENT_SCREEN, {id: data?.eventHosts?.[0]?.id});
  }, [data?.eventHosts?.[0]?.id]);

  const handleShare = useCallback(() => {
    Share.share({
      title: `https://connect-x-app.netlify.app/event/${data?.id}`,
      message: `https://connect-x-app.netlify.app/event/${data?.id}`,
    });
  }, []);

  const handleJoinEvent = useCallback(async () => {
    try {
      setLoading(true);
      const {data: dataEvent} = await JoinEvent(data?.id || params.id);
      console.log('dataEvent>>', dataEvent);
      showSuccessTop('Join event successfully!');
    } catch (error) {
      showWarningTop(
        typeof error === 'string'
          ? error
          : 'Join event failed, please try again!',
      );
    } finally {
      setLoading(false);
    }
  }, [data?.id || params.id]);

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <Header
        handleShare={handleShare}
        banner={data?.eventAssets?.[0]?.url}
        top={top}
        scrollY={scrollY}
        title={data?.name || params.name}
      />
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
          <Text style={styles.title}>
            {data?.name || params.name || 'Acoustic Night - Tweendee'}
          </Text>
          <Block row alignCenter marginBottom={20}>
            <Block style={styles.boxIcon}>
              <CalendarIcon />
            </Block>
            <Block flex>
              <Text numberOfLines={1} style={styles.textTitleInfo}>
                {moment(data?.eventDate || params.eventDate).format(
                  'DD/MM/YYYY',
                )}
              </Text>
              <Text numberOfLines={1} style={styles.textSubInfo}>
                {moment(data?.eventDate || params.eventDate).format(
                  'dddd, h:mm A',
                )}
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
                {data?.location || params.location || 'Sub Location'}
              </Text>
            </Block>
          </Block>
          {__DEV__ && (
            <Block row alignCenter marginBottom={30}>
              <TouchableOpacity
                onPress={handleProfileOwner}
                activeOpacity={0.5}
                style={styles.contentUser}>
                <Image source={Images.AVATAR} style={styles.boxIcon} />
                <Block row flex alignCenter>
                  <Block flex>
                    <Text numberOfLines={1} style={styles.textTitleInfo}>
                      {data?.eventHosts?.[0]?.title || 'Location'}
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
          )}
          <Text style={styles.textAboutEvent}>About Event</Text>
          <Text style={styles.textDescription}>
            {data?.description || params.description}
          </Text>
        </Block>
      </Animated.ScrollView>
      <Footer isLoading={isLoading} handleJoinEvent={handleJoinEvent} />
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
    paddingBottom: HEIGHT_SCREEN * 0.25,
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
