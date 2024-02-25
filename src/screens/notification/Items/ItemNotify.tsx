import Images from '@assets/images';
import {getSize} from '@base/common/responsive';
import {Block, ButtonGradient, Image, Text} from '@components';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const ItemNotify = () => {
  return (
    <Block style={styles.container}>
      <Image source={Images.AVATAR} style={styles.avatar} />
      <Block flex marginLeft={12}>
        <Text style={styles.content}>Name Invite to Event Name</Text>
        {true && (
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
      <Text style={styles.textTime}>20 min ago</Text>
    </Block>
  );
};

const styles = StyleSheet.create({
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
    fontFamily: Font.font_regular_400,
    marginTop: getSize.m(4),
  },
  textTime: {
    fontSize: getSize.m(12, 0.3),
    fontFamily: Font.font_light_200,
    marginTop: getSize.m(4),
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
});

export default memo(ItemNotify);
