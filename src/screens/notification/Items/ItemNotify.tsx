import Images from '@assets/images';
import {getSize} from '@base/common/responsive';
import {Block, ButtonGradient, Image, Text} from '@components';
import {ItemNotification} from '@model/notification';
import {navigate} from '@navigation/navigationService';
import {PROFILE_OWNER_EVENT_SCREEN} from '@navigation/routes';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {TColors} from '@theme/Theme';
import {useStyle} from '@theme/useStyle';
import moment from 'moment';
import {FC, memo, useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

interface IProps extends ItemNotification {}

const ItemNotify: FC<IProps> = ({title, body, sender, createdAt}) => {
  const styles = useStyle(getStyles);
  const handleItem = useCallback(() => {
    sender?.id && navigate(PROFILE_OWNER_EVENT_SCREEN, {id: sender.id});
  }, [sender?.id]);

  return (
    <TouchableOpacity
      onPress={handleItem}
      disabled={!__DEV__}
      activeOpacity={0.5}
      style={styles.container}>
      <Image
        source={sender?.avatarUrl ? {uri: sender.avatarUrl} : Images.AVATAR}
        style={styles.avatar}
      />
      <Block flex marginLeft={12}>
        <Text style={styles.content}>{title}</Text>
        <Text style={styles.textBodyMessage}>{body}</Text>
        {false && (
          <Block row alignCenter marginTop={12}>
            <TouchableOpacity style={styles.btnReject} activeOpacity={0.5}>
              <Text>Reject</Text>
            </TouchableOpacity>
            <ButtonGradient isRightIcon={false} style={styles.btnAccept}>
              <Text>Accept</Text>
            </ButtonGradient>
          </Block>
        )}
      </Block>
      <Text style={styles.textTime}>{moment(createdAt).fromNow()}</Text>
    </TouchableOpacity>
  );
};

const getStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: getSize.s(20),
      marginBottom: getSize.v(12),
      paddingVertical: getSize.m(8),
    },
    avatar: {
      width: getSize.m(44),
      height: getSize.m(44),
      borderRadius: getSize.m(22),
    },
    content: {
      fontSize: getSize.m(14, 0.3),
      fontFamily: Font.font_medium_500,
      marginTop: getSize.m(4),
      color: colors.mainForeground,
    },
    textTime: {
      fontSize: getSize.m(12, 0.3),
      fontFamily: Font.font_light_200,
      marginTop: getSize.m(4),
      color: colors.mainForeground,
    },
    btnReject: {
      height: getSize.m(36),
      borderRadius: getSize.m(8),
      borderWidth: getSize.m(1),
      borderColor: Color.WHITE,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: getSize.s(20),
      marginRight: getSize.m(12),
    },
    btnAccept: {
      height: getSize.m(36),
      paddingHorizontal: getSize.s(20),
      borderRadius: getSize.m(8),
    },
    textBodyMessage: {
      fontSize: getSize.m(12, 0.3),
      fontFamily: Font.font_extra_light_300,
      marginTop: getSize.m(6),
      color: colors.mainForeground,
    },
  });

export default memo(ItemNotify);
