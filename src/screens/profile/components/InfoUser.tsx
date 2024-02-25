import EditIcon from '@assets/icons/profile/EditIcon';
import MessageIcon from '@assets/icons/profile/MessageIcon';
import UserPlusIcon from '@assets/icons/profile/UserPlusIcon';
import Images from '@assets/images';
import {getSize} from '@base/common/responsive';
import {Block, ButtonGradient, Image, Text} from '@components';
import {navigate} from '@navigation/navigationService';
import {EDIT_PROFILE_SCREEN} from '@navigation/routes';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FC, Fragment, memo, useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

interface IProps {
  isMe: boolean;
}

const InfoUser: FC<IProps> = ({isMe}) => {
  const handleEditProfile = useCallback(() => {
    navigate(EDIT_PROFILE_SCREEN);
  }, []);

  return (
    <Block style={styles.container}>
      <Block alignCenter>
        <Image style={styles.avatar} source={Images.AVATAR} />
        <Text style={styles.nameUser}>Jonny Deep B</Text>
        <Block row alignCenter justifyCenter>
          <Block alignCenter>
            <Text style={styles.numberFollow}>234</Text>
            <Text style={styles.textFollow}>Following</Text>
          </Block>
          <Block style={styles.wall} />
          <Block alignCenter>
            <Text style={styles.numberFollow}>521</Text>
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
          <Fragment>
            <ButtonGradient
              styleContainer={styles.styleContainerFollow}
              style={styles.btnFollow}
              isRightIcon={false}>
              <UserPlusIcon />
              <Text style={styles.textBtnFollow}>Follow</Text>
            </ButtonGradient>
            <TouchableOpacity activeOpacity={0.5} style={styles.btnMessage}>
              <MessageIcon />
              <Text style={styles.textBtnMessage}>Massages</Text>
            </TouchableOpacity>
          </Fragment>
        )}
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: getSize.s(20),
    marginBottom: getSize.v(20),
  },
  avatar: {
    width: getSize.s(96),
    height: getSize.s(96),
    borderRadius: getSize.s(48),
    marginTop: getSize.v(12),
  },
  nameUser: {
    fontSize: getSize.m(24, 0.3),
    fontFamily: Font.font_medium_500,
    marginVertical: getSize.v(16),
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
  },
  textFollow: {
    fontSize: getSize.m(14, 0.3),
    fontFamily: Font.font_regular_400,
  },
  styleContainerFollow: {
    flex: 1,
    marginRight: getSize.s(20),
  },
  btnFollow: {
    height: getSize.m(50),
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
    color: Color.BACKGROUND,
    marginLeft: getSize.m(8),
  },
  textBtnMessage: {
    fontSize: getSize.m(16),
    fontFamily: Font.font_regular_400,
    color: '#5669FF',
    marginLeft: getSize.m(8),
  },
});

export default memo(InfoUser);
