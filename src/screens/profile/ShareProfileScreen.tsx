import {Icon} from '@assets/icons';
import Images from '@assets/images';
import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {hapticFeedback} from '@base/utils/Utils';
import {Block, ButtonGradient, Image, TabBar, Text} from '@components';
import {UserState} from '@redux/slices/userSlice';
import {IRootState} from '@redux/stores';
import {uStateUser} from '@redux/stores/selection';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {useCallback} from 'react';
import {ScrollView, Share, StyleSheet} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

const ShareProfileScreen = () => {
  const {id, avatarUrl, fullName, company} = useSelector<IRootState, UserState>(
    uStateUser,
  );

  const handleShare = useCallback(() => {
    hapticFeedback();
    Share.share({
      title: `https://connectx.network/user/${id}`,
      message: `https://connectx.network/user/${id}`,
    });
  }, [id]);

  return (
    <SafeAreaView style={Styles.container} edges={['top']}>
      <TabBar title="Share Profile" hideRightIcon />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={styles.info}>
          <Image
            style={styles.avatar}
            source={avatarUrl ? {uri: avatarUrl} : Images.AVATAR}
          />
          <Block flex marginLeft={12}>
            <Text style={styles.name}>{fullName}</Text>
            <Block row alignCenter>
              <Icon
                name={'business'}
                color={Color.BACKGROUND}
                size={getSize.m(16)}
              />
              <Text style={styles.textCompany}>{company || 'No company'}</Text>
            </Block>
          </Block>
        </Block>
        <Block style={styles.qrCode}>
          <QRCode
            value={`https://connectx.network/user/${id}`}
            size={WIDTH_SCREEN - getSize.s(80)}
          />
        </Block>
        <ButtonGradient
          onPress={handleShare}
          styleContainer={styles.btnShare}
          isRightIcon={false}>
          <Icon
            name={'share-outline'}
            color={Color.WHITE}
            size={getSize.m(22, 0.3)}
          />
          <Text style={styles.textShare}>Share Link</Text>
        </ButtonGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.WHITE,
    marginHorizontal: getSize.s(20),
    marginTop: getSize.v(12),
    borderRadius: getSize.m(12),
    paddingVertical: getSize.v(12),
    paddingHorizontal: getSize.s(18),
  },
  avatar: {
    width: getSize.m(48),
    height: getSize.m(48),
    borderRadius: getSize.m(12),
  },
  name: {
    fontFamily: Font.font_medium_500,
    color: Color.BACKGROUND,
    fontSize: getSize.m(15, 0.3),
    marginBottom: getSize.m(3),
  },
  textCompany: {
    fontFamily: Font.font_regular_400,
    color: Color.BACKGROUND,
    fontSize: getSize.m(12, 0.3),
    marginLeft: getSize.m(4),
  },
  qrCode: {
    width: WIDTH_SCREEN - getSize.s(40),
    backgroundColor: Color.WHITE,
    alignItems: 'center',
    paddingVertical: getSize.s(20),
    borderRadius: getSize.m(12),
    alignSelf: 'center',
    marginTop: getSize.v(20),
  },
  btnShare: {
    marginHorizontal: getSize.s(40),
    marginTop: getSize.v(30),
  },
  textShare: {
    fontFamily: Font.font_medium_500,
    fontSize: getSize.m(15, 0.3),
    marginLeft: getSize.m(6),
  },
});

export default ShareProfileScreen;
