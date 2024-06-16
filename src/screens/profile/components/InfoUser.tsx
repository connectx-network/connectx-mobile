import {Icon} from '@assets/icons';
import EditIcon from '@assets/icons/profile/EditIcon';
import UserPlusIcon from '@assets/icons/profile/UserPlusIcon';
import Images from '@assets/images';
import {getSize} from '@base/common/responsive';
import {Block, ButtonGradient, Image, Text} from '@components';
import {StatusConnect} from '@model/user';
import {navigate} from '@navigation/navigationService';
import {EDIT_PROFILE_SCREEN, LOGIN_SCREEN} from '@navigation/routes';
import {
  CheckConnectUser,
  ConnectUser,
  UnConnectUser,
} from '@services/user.service';
import {useQuery} from '@tanstack/react-query';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {TColors} from '@theme/Theme';
import {useStyle} from '@theme/useStyle';
import {AxiosResponse} from 'axios';
import {FC, memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

interface IProps {
  isMe: boolean;
  fullName?: string;
  avatarUrl?: string | null;
  followers?: number;
  following?: number;
  refetch?: () => void;
  id?: string;
  company?: string | null;
  isLogged: boolean;
}

const InfoUser: FC<IProps> = ({
  isMe,
  fullName,
  avatarUrl,
  followers,
  following,
  refetch,
  id = '',
  company,
  isLogged,
}) => {
  const styles = useStyle(getStyles);
  const handleEditProfile = () => {
    if (!isLogged) {
      return navigate(LOGIN_SCREEN);
    }
    navigate(EDIT_PROFILE_SCREEN, {refetch});
  };

  const {data, refetch: refetchCheckFollow} = useQuery<
    AxiosResponse<StatusConnect>,
    Error
  >({
    queryKey: ['checkFollow', {id}],
    queryFn: () => CheckConnectUser(id),
    enabled: !isMe && isLogged,
  });

  const handleFollow = async () => {
    try {
      if (data?.data === 'NO_CONNECTION' || data?.data === 'FOLLOWER') {
        await ConnectUser(id);
      } else {
        await UnConnectUser(id);
      }
      refetchCheckFollow();
      refetch && refetch();
    } catch (error) {}
  };

  return (
    <Block style={styles.container}>
      <Block alignCenter>
        <Image
          source={
            avatarUrl
              ? {
                  uri: avatarUrl,
                }
              : Images.AVATAR
          }
          style={styles.avatar}
        />
        <Text style={styles.nameUser}>{fullName}</Text>
        {company && (
          <Block row alignCenter marginBottom={8}>
            <Icon name={'business'} size={getSize.m(18)} {...styles.icon} />
            <Text style={styles.textCompany}>{company}</Text>
          </Block>
        )}
        <Block row alignCenter justifyCenter marginTop={8}>
          <Block alignCenter>
            <Text style={styles.numberFollow}>{following || 0}</Text>
            <Text style={styles.textFollow}>Following</Text>
          </Block>
          <Block style={styles.wall} />
          <Block alignCenter>
            <Text style={styles.numberFollow}>{followers || 0}</Text>
            <Text style={styles.textFollow}>Followers</Text>
          </Block>
        </Block>
      </Block>
      <Block row alignCenter marginTop={30}>
        {isMe ? (
          <Block alignCenter flex>
            <TouchableOpacity
              onPress={handleEditProfile}
              activeOpacity={0.5}
              style={styles.btnMessage}>
              <EditIcon />
              <Text style={styles.textBtnMessage}>Edit Profile</Text>
            </TouchableOpacity>
          </Block>
        ) : (
          <Block alignCenter flex>
            {false && isLogged && (
              <ButtonGradient
                onPress={handleFollow}
                styleContainer={styles.styleContainerFollow}
                style={styles.btnFollow}
                isRightIcon={false}>
                {data?.data === 'NO_CONNECTION' || data?.data === 'FOLLOWER' ? (
                  <UserPlusIcon />
                ) : (
                  <Icon
                    name={'heart-outline'}
                    color={Color.WHITE}
                    size={getSize.m(22)}
                  />
                )}
                <Text
                  color={
                    data?.data === 'NO_CONNECTION' || data?.data === 'FOLLOWER'
                      ? Color.BACKGROUND
                      : Color.WHITE
                  }
                  style={styles.textBtnFollow}>
                  {data?.data === 'NO_CONNECTION' || data?.data === 'FOLLOWER'
                    ? 'Follow'
                    : 'Followed'}
                </Text>
              </ButtonGradient>
            )}
            {/* <TouchableOpacity activeOpacity={0.5} style={styles.btnMessage}>
              <MessageIcon />
              <Text style={styles.textBtnMessage}>Massages</Text>
            </TouchableOpacity> */}
          </Block>
        )}
      </Block>
    </Block>
  );
};

const getStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: getSize.s(20),
      marginBottom: getSize.v(20),
    },
    avatar: {
      width: getSize.s(96),
      height: getSize.s(96),
      borderRadius: getSize.s(48),
      marginTop: getSize.v(12),
      backgroundColor: '#29313E',
    },
    nameUser: {
      fontSize: getSize.m(24, 0.3),
      fontFamily: Font.font_medium_500,
      marginTop: getSize.v(16),
      marginBottom: getSize.v(6),
      color: colors.mainForeground,
    },
    wall: {
      backgroundColor: '#DDDDDD',
      width: getSize.m(1),
      marginHorizontal: getSize.s(16),
      height: getSize.m(30),
    },
    numberFollow: {
      fontSize: getSize.m(16, 0.3),
      fontFamily: Font.font_medium_500,
      marginBottom: getSize.m(6),
      color: colors.mainForeground,
    },
    textFollow: {
      fontSize: getSize.m(14, 0.3),
      fontFamily: Font.font_regular_400,
      color: colors.mainForeground,
    },
    styleContainerFollow: {
      alignSelf: 'center',

      // flex: 1,
      // marginRight: getSize.s(20),
    },
    btnFollow: {
      height: getSize.m(50),
      paddingHorizontal: getSize.s(30),
    },
    btnMessage: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      height: getSize.m(50),
      borderRadius: getSize.m(12),
      borderWidth: getSize.m(2),
      borderColor: '#5669FF',
      justifyContent: 'center',
      paddingHorizontal: getSize.s(20),
    },
    textBtnFollow: {
      fontSize: getSize.m(16),
      fontFamily: Font.font_regular_400,
      marginLeft: getSize.m(8),
    },
    textBtnMessage: {
      fontSize: getSize.m(16),
      fontFamily: Font.font_regular_400,
      color: '#5669FF',
      marginLeft: getSize.m(8),
    },
    textCompany: {
      marginLeft: getSize.m(4),
      fontFamily: Font.font_medium_500,
      color: `${colors.mainForeground}80`,
      fontSize: getSize.m(13, 0.3),
    },
    icon: {
      color: `${colors.mainForeground}80`,
    },
  });

export default memo(InfoUser);
