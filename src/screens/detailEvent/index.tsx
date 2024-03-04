import Color from '@theme/Color';
import {FC, Fragment, memo, useCallback, useState} from 'react';
import {Linking, Share, StyleSheet, TouchableOpacity} from 'react-native';
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
import {useDetailEvent, useFetchJoinEvent} from './hooks';
import moment from 'moment';
import {CheckJoinEvent, JoinEvent} from '@services/event.service';
import {useToastMessage} from '@hooks/useToastMessage';
import PreviewMap from './components/PreviewMap';
import ModalJoinSuccess from './components/ModalJoinSuccess';
import {useQuery} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {useSelector} from 'react-redux';
import {IRootState} from '@redux/stores';
import {UserState} from '@redux/slices/userSlice';
import {uStateUser} from '@redux/stores/selection';
import {Icon} from '@assets/icons';

interface IProps {
  route: DetailEventScreenRouteProp;
}

const DetailEventScreen: FC<IProps> = ({route: {params}}) => {
  const {top} = useSafeAreaInsets();
  const {showWarningTop} = useToastMessage();
  const scrollY = useSharedValue<number>(0);
  const {data} = useDetailEvent(params.id);
  const {id} = useSelector<IRootState, UserState>(uStateUser);
  const {
    data: dataJoinEvent,
    totalElement,
    onRefresh,
  } = useFetchJoinEvent({
    page: 1,
    size: 10,
    userId: id,
    eventId: params.id,
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);

  const {data: dataCheckJoinEvent, refetch} = useQuery<
    AxiosResponse<{joined: boolean}>,
    Error
  >({
    queryKey: ['checkJoinEvent', {id: params.id}],
    queryFn: () => CheckJoinEvent(params.id),
  });

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {y}}) => {
      scrollY.value = y;
    },
  });

  const handleProfileOwner = useCallback(() => {
    navigate(PROFILE_OWNER_EVENT_SCREEN, {id: data?.eventHosts?.[0]?.id});
  }, [data?.eventHosts?.[0]?.id]);

  const handleJoinEvent = useCallback(async () => {
    try {
      setLoading(true);
      await JoinEvent(data?.id || params.id);
      refetch();
      onRefresh();
      setShowModalSuccess(true);
    } catch (error) {
      showWarningTop(
        typeof error === 'string'
          ? error
          : 'Join event failed, please try again!',
      );
    } finally {
      setLoading(false);
    }
  }, [data?.id || params.id, refetch, onRefresh]);

  const handleCloseModalJoin = useCallback(() => {
    setShowModalSuccess(false);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <Header
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
            totalUser={totalElement}
            users={dataJoinEvent}
          />
          {/* <ButtonGradient isRightIcon={false} style={styles.btnInvite}>
            <Text>Invite</Text>
          </ButtonGradient> */}
        </Block>
        <Block style={Styles.paddingHorizontal}>
          <Text style={styles.title}>{data?.name || params.name}</Text>
          <Block row alignCenter marginBottom={30} marginTop={8}>
            {dataCheckJoinEvent?.data?.joined && (
              <Fragment>
                <Icon
                  name={'checkmark-circle-outline'}
                  color={Color.GREEN_HOLDER}
                  size={getSize.m(20)}
                />
                <Text style={styles.textJoinEvent}>
                  You have joined the event
                </Text>
              </Fragment>
            )}
          </Block>
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
          {false && (
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
          <PreviewMap
            latitude={Number(
              data?.eventLocationDetail?.latitude ||
                params.eventLocationDetail?.latitude,
            )}
            longitude={Number(
              Number(
                data?.eventLocationDetail?.longitude ||
                  params.eventLocationDetail?.longitude,
              ),
            )}
            location={data?.location || params?.location}
          />
          <Text style={styles.textAboutEvent}>About Event</Text>
          <Text style={styles.textDescription}>
            {data?.description || params.description}
          </Text>
          <Text style={styles.textAboutEvent}>Host</Text>
          <Block row alignCenter wrap>
            {data?.eventHosts?.map((item, index) => {
              const handleLink = () => {
                item.url && Linking.openURL(item.url);
              };
              return (
                <Text onPress={handleLink} style={styles.textHost} key={index}>
                  <Text style={styles.textHost}>{index === 0 ? '' : ', '}</Text>
                  {item.title?.trim()}
                </Text>
              );
            })}
          </Block>
        </Block>
      </Animated.ScrollView>
      {!dataCheckJoinEvent?.data?.joined && (
        <Footer isLoading={isLoading} handleJoinEvent={handleJoinEvent} />
      )}
      <ModalJoinSuccess
        isVisible={showModalSuccess}
        onBackdropPress={handleCloseModalJoin}
      />
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
    alignSelf: 'center',
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
    marginBottom: getSize.v(12),
  },
  contentUser: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textHost: {
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_medium_500,
    color: '#5669FF',
  },
  textJoinEvent: {
    fontSize: getSize.m(13, 0.3),
    fontFamily: Font.font_regular_400,
    marginLeft: getSize.m(6),
    color: Color.GREEN_HOLDER,
  },
});

export default DetailEventScreen;
