import {Icon} from '@assets/icons';
import CalendarIcon from '@assets/icons/detailEvent/CalendarIcon';
import LocationIcon from '@assets/icons/detailEvent/LocationIcon';
import Images from '@assets/images';
import {getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {getDateEvent, getTimeEvent} from '@base/utils/Utils';
import {Block, Image, TabBar, Text} from '@components';
import {Event, GetQrCodeEventParams, InfoQrEventResponse} from '@model/event';
import {UserInfo} from '@model/user';
import {ConfirmInfoUserScreenRouteProp} from '@navigation/routes';
import {CheckIneEvent, GetInfoQrCodeEvent} from '@services/event.service';
import {useQuery} from '@tanstack/react-query';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {AxiosResponse} from 'axios';
import moment from 'moment';
import {FC, useCallback, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Footer from './components/Footer';
import {goBack} from '@navigation/navigationService';
import {useToastMessage} from '@hooks/useToastMessage';

interface IProps {
  route: ConfirmInfoUserScreenRouteProp;
}

const ConfirmInfoUserScreen: FC<IProps> = ({route: {params}}) => {
  const {eventId, userId} = params;
  const {showWarningTop, showSuccessTop} = useToastMessage();
  const [isLoading, setLoading] = useState<boolean>(false);

  const {data} = useQuery<AxiosResponse<InfoQrEventResponse>, Error>({
    queryKey: ['getInfoQrCodeEvent', {eventId, userId}],
    queryFn: () => GetInfoQrCodeEvent({eventId, userId}),
  });

  const user: UserInfo | undefined = data?.data?.user;
  const event: Event | undefined = data?.data?.event;

  const handleCheckIn = useCallback(async () => {
    try {
      setLoading(true);
      const {data: dataCheckIn} = await CheckIneEvent({eventId, userId});
      console.log('dataCheckIn>>', dataCheckIn);
      goBack();
      showSuccessTop(`${user?.fullName} checked in successfully!`);
    } catch (error) {
      showWarningTop('Check in failed, please try again!');
    } finally {
      setLoading(false);
    }
  }, [eventId, userId, user?.fullName]);

  return (
    <SafeAreaView style={Styles.container}>
      <TabBar title="Confirm Info" />
      <ScrollView>
        <Block alignCenter marginVertical={30}>
          <Image
            style={styles.avatar}
            source={user?.avatarUrl ? {uri: user.avatarUrl} : Images.AVATAR}
          />
          <Text style={styles.fullName}>{user?.fullName}</Text>
        </Block>
        <Block style={Styles.paddingHorizontal}>
          <Text marginBottom={20} style={styles.titleEvent}>
            {event?.name}
          </Text>
          <Block row alignCenter marginBottom={20}>
            <Block style={styles.boxIcon}>
              <Icon
                name={'person-add'}
                color={Color.WHITE}
                size={getSize.m(20)}
              />
            </Block>
            <Block flex>
              <Text numberOfLines={1} style={styles.textTitleInfo}>
                Join At
              </Text>
              <Text numberOfLines={1} style={styles.textSubInfo}>
                {moment(data?.data?.joinDate).format('hh:mm A - DD/MM/YYYY')}
              </Text>
            </Block>
          </Block>
          <Block row alignCenter marginBottom={20}>
            <Block style={styles.boxIcon}>
              <CalendarIcon />
            </Block>
            <Block flex>
              <Text numberOfLines={1} style={styles.textTitleInfo}>
                {getDateEvent(event?.eventDate, event?.eventEndDate)}
              </Text>
              <Text numberOfLines={1} style={styles.textSubInfo}>
                {getTimeEvent(event?.eventDate, event?.eventEndDate)}
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
                {event?.location}
              </Text>
            </Block>
          </Block>
          <Text style={styles.titleEvent} marginBottom={12}>
            Status
          </Text>
          <Block row alignCenter>
            <Icon
              name={
                data?.data.checkedIn
                  ? 'checkmark-circle-outline'
                  : 'close-circle-outline'
              }
              color={
                data?.data.checkedIn ? Color.GREEN_HOLDER : Color.RED_HOLDER
              }
              size={getSize.m(22)}
            />
            <Text
              color={
                data?.data.checkedIn ? Color.GREEN_HOLDER : Color.RED_HOLDER
              }
              style={styles.textCheckIn}>
              {data?.data?.checkedIn ? 'Checked in' : "Haven't checked in yet"}
            </Text>
          </Block>
        </Block>
      </ScrollView>
      {!data?.data?.checkedIn && (
        <Footer isLoading={isLoading} handleCheckIn={handleCheckIn} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: getSize.m(94),
    height: getSize.m(94),
    borderRadius: getSize.m(47),
  },
  fullName: {
    fontSize: getSize.m(22, 0.3),
    fontFamily: Font.font_medium_500,
    marginTop: getSize.m(8),
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
  titleEvent: {
    fontSize: getSize.m(18, 0.3),
    fontFamily: Font.font_medium_500,
  },
  textCheckIn: {
    fontSize: getSize.m(16, 0.3),
    fontFamily: Font.font_medium_500,
    marginLeft: getSize.m(6),
  },
});

export default ConfirmInfoUserScreen;
