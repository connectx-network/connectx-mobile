import {Icon} from '@assets/icons';
import CalendarIcon from '@assets/icons/detailEvent/CalendarIcon';
import LocationIcon from '@assets/icons/detailEvent/LocationIcon';
import {HEIGHT_SCREEN, WIDTH_SCREEN, getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {getDateEvent, getTimeEvent, hapticFeedback} from '@base/utils/Utils';
import {Block, ButtonGradient, Text} from '@components';
import {useToastMessage} from '@hooks/useToastMessage';
import {
  checkCanGoBack,
  goBack,
  navigate,
  reset,
} from '@navigation/navigationService';
import {
  DRAWER_STACK,
  DetailEventScreenRouteProp,
  LOGIN_SCREEN,
  SCAN_QR_SCREEN,
} from '@navigation/routes';
import {UserState} from '@redux/slices/userSlice';
import {IRootState} from '@redux/stores';
import {uStateUser} from '@redux/stores/selection';
import UserJoined from '@screens/home/components/UserJoined';
import {CheckJoinEvent, JoinEvent} from '@services/event.service';
import {useQuery} from '@tanstack/react-query';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {TColors, useTheme} from '@theme/Theme';
import {useStyle} from '@theme/useStyle';
import {AxiosResponse} from 'axios';
import moment from 'moment';
import {FC, Fragment, useCallback, useEffect, useState} from 'react';
import {
  Image,
  Linking,
  Share,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import BSListJoinEvent, {
  listJoinEventControl,
  listJoinEventRef,
} from './BSListJoinEvent';
import Footer from './components/Footer';
import Header from './components/Header';
import ModalJoinSuccess from './components/ModalJoinSuccess';
import ModalQrCode, {
  modalQrControl,
  refModalQr,
} from './components/ModalQrCode';
import PreviewMap from './components/PreviewMap';
import {useDetailEvent} from './hooks';
import {HEIGHT_COVER} from './layout';

interface IProps {
  route: DetailEventScreenRouteProp;
}

const DetailEventScreen: FC<IProps> = ({route: {params}}) => {
  const {top} = useSafeAreaInsets();
  const styles = useStyle(getStyles);
  const {colors} = useTheme();
  const {showWarningTop} = useToastMessage();
  const scrollY = useSharedValue<number>(0);
  const {data, onRefresh} = useDetailEvent(params.shortId);
  const {id, userRole, isLogged} = useSelector<IRootState, UserState>(
    uStateUser,
  );
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [heightCover, setHeightCover] = useState<number>(0);

  useEffect(() => {
    if (data?.eventAssets?.[0]?.url) {
      Image.getSize(data?.eventAssets?.[0]?.url, (width, height) => {
        width && height && setHeightCover((WIDTH_SCREEN * height) / width);
      });
    } else {
      setHeightCover(0);
    }
  }, [data?.eventAssets?.[0]?.url]);

  const {data: dataCheckJoinEvent, refetch} = useQuery<
    AxiosResponse<{joined: boolean}>,
    Error
  >({
    queryKey: ['checkJoinEvent', {id: params.shortId}],
    queryFn: () => CheckJoinEvent(params.shortId),
    enabled: isLogged,
  });

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {y}}) => {
      scrollY.value = y;
    },
  });

  const handleJoinEvent = useCallback(async () => {
    if (data?.eventType === 'READONLY') {
      return data.registUrl && Linking.openURL(data.registUrl);
    }

    if (!isLogged) {
      return reset(LOGIN_SCREEN, {shortId: params.shortId});
    }

    if (userRole === 'ADMIN') {
      return navigate(SCAN_QR_SCREEN);
    }

    try {
      setLoading(true);
      await JoinEvent(data?.id || params.id);
      refetch();
      onRefresh();
      listJoinEventControl.refresh();
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
  }, [
    data?.id,
    params.id,
    refetch,
    onRefresh,
    userRole,
    isLogged,
    params.shortId,
  ]);

  const handleCloseModalJoin = useCallback(() => {
    setShowModalSuccess(false);
  }, []);

  const handleShowQrCode = useCallback(() => {
    hapticFeedback();
    modalQrControl.show(`${params.id || data?.id};${id}`); //eventId;userId
  }, [id, params.id, data?.id]);

  const handleShowListJoinEvent = useCallback(() => {
    listJoinEventControl.show();
  }, []);

  const handleShare = useCallback(() => {
    hapticFeedback();
    params.shortId &&
      Share.share({
        title: `https://connectx.network/${params.shortId}`,
        message: `https://connectx.network/${params.shortId}`,
      });
  }, [params.shortId]);

  const handleBack = useCallback(() => {
    if (checkCanGoBack()) {
      return goBack();
    }
    reset(isLogged ? DRAWER_STACK : LOGIN_SCREEN);
  }, [isLogged, params.shortId]);

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <Header
        handleBack={handleBack}
        banner={data?.eventAssets?.[0]?.url}
        top={top}
        scrollY={scrollY}
        title={data?.name || params.name}
        heightCover={heightCover}
      />
      <Animated.ScrollView
        onScroll={onScroll}
        contentContainerStyle={[
          styles.contentContainerStyle,
          !!heightCover && {
            paddingTop: heightCover - getSize.m(30),
          },
        ]}>
        {!!data?.joinedEventUsers?.length && (
          <Block style={styles.boxInvite}>
            <UserJoined
              styleText={styles.textGoing}
              style={styles.imageUser}
              translateX={getSize.m(14)}
              totalUser={data?._count?.joinedEventUsers}
              users={data?.joinedEventUsers}
            />
            <ButtonGradient
              onPress={handleShowListJoinEvent}
              isRightIcon={false}
              style={styles.btnInvite}>
              <Text style={styles.seeMore}>See more</Text>
            </ButtonGradient>
          </Block>
        )}
        <Block
          marginTop={!data?.joinedEventUsers?.length ? 30 : 0}
          style={Styles.paddingHorizontal}>
          <Block row marginTop={20} space="between" alignStart>
            <Text style={styles.title}>{data?.name || params.name}</Text>
            <TouchableOpacity
              style={styles.btnShare}
              onPress={handleShare}
              activeOpacity={0.5}>
              <Icon
                name={'share-outline'}
                color={colors.mainForeground}
                size={getSize.m(24)}
              />
            </TouchableOpacity>
          </Block>
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
              <CalendarIcon color={colors.mainForeground} />
            </Block>
            <Block flex>
              <Text numberOfLines={1} style={styles.textTitleInfo}>
                {getDateEvent(
                  data?.eventDate || params.eventDate,
                  data?.eventEndDate || params.eventEndDate,
                )}
              </Text>
              <Text numberOfLines={1} style={styles.textSubInfo}>
                {getTimeEvent(
                  data?.eventDate || params.eventDate,
                  data?.eventEndDate || params.eventEndDate,
                )}
              </Text>
            </Block>
          </Block>
          <Block row alignCenter marginBottom={20}>
            <Block style={styles.boxIcon}>
              <LocationIcon color={colors.mainForeground} />
            </Block>
            <Block flex>
              <Text numberOfLines={1} style={styles.textTitleInfo}>
                Location
              </Text>
              <Text numberOfLines={1} style={styles.textSubInfo}>
                {data?.location || params.location}
              </Text>
            </Block>
          </Block>
          {dataCheckJoinEvent?.data?.joined && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleShowQrCode}
              style={styles.btnShowQr}>
              <Icon
                name={'qr-code-outline'}
                color={colors.mainForeground}
                size={getSize.m(22)}
              />
              <Text style={styles.textShowQr}>Show Qr code event</Text>
            </TouchableOpacity>
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
      {(dataCheckJoinEvent?.data?.joined === false ||
        userRole === 'ADMIN' ||
        !isLogged) &&
        moment(data?.eventEndDate).unix() > moment().unix() && (
          <Footer
            isLoading={isLoading}
            userRole={userRole}
            handleJoinEvent={handleJoinEvent}
          />
        )}
      <ModalJoinSuccess
        isVisible={showModalSuccess}
        onBackdropPress={handleCloseModalJoin}
        userId={id}
        eventId={params.id || data?.id}
      />
      <ModalQrCode ref={refModalQr} />
      <BSListJoinEvent ref={listJoinEventRef} eventId={data?.id || params.id} />
    </SafeAreaView>
  );
};

const getStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.mainBackground,
      flex: 1,
    },
    contentContainerStyle: {
      paddingTop: HEIGHT_COVER - getSize.m(30),
      paddingBottom: HEIGHT_SCREEN * 0.25,
    },
    boxInvite: {
      backgroundColor: colors.secondaryBackground,
      height: getSize.m(60),
      marginHorizontal: getSize.s(40),
      borderRadius: getSize.m(30),
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: getSize.s(12),
      justifyContent: 'space-between',
      shadowColor: colors.shadow,
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 4,
    },
    imageUser: {
      width: getSize.m(34),
      height: getSize.m(34),
      borderRadius: getSize.m(17),
    },
    textGoing: {
      color: '#38BFDD',
      fontSize: getSize.m(14, 0.3),
      fontFamily: Font.font_medium_500,
      marginLeft: getSize.m(8),
    },
    btnInvite: {
      height: getSize.m(34),
      paddingHorizontal: getSize.s(12),
      borderRadius: getSize.m(8),
    },
    title: {
      fontSize: getSize.m(24, 0.3),
      fontFamily: Font.font_regular_400,
      flex: 1,
      color: colors.mainForeground,
    },
    boxIcon: {
      width: getSize.m(48),
      height: getSize.m(48),
      borderRadius: getSize.m(12),
      backgroundColor: `${colors.mainForeground}10`,
      ...Styles.centerNoFlex,
      marginRight: getSize.m(12),
    },
    textTitleInfo: {
      fontFamily: Font.font_medium_500,
      fontSize: getSize.m(16, 0.3),
      marginBottom: getSize.m(6),
      color: colors.mainForeground,
    },
    textSubInfo: {
      fontSize: getSize.m(12, 0.3),
      fontFamily: Font.font_light_200,
      color: colors.mainForeground,
    },
    textAboutEvent: {
      fontFamily: Font.font_medium_500,
      fontSize: getSize.m(18, 0.3),
      marginBottom: getSize.m(12),
      color: colors.mainForeground,
    },
    textDescription: {
      fontSize: getSize.m(16, 0.3),
      fontFamily: Font.font_thin_100,
      lineHeight: getSize.m(24),
      marginBottom: getSize.v(12),
      color: colors.mainForeground,
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
    btnShowQr: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: getSize.m(20),
      alignSelf: 'center',
    },
    textShowQr: {
      marginLeft: getSize.m(8),
      fontSize: getSize.m(13, 0.3),
      fontFamily: Font.font_medium_500,
      color: colors.mainForeground,
    },
    seeMore: {
      fontSize: getSize.m(13, 0.3),
      fontFamily: Font.font_regular_400,
    },
    btnShare: {
      paddingVertical: getSize.m(4),
      paddingHorizontal: getSize.m(2),
      marginTop: getSize.m(4),
    },
  });

export default DetailEventScreen;
