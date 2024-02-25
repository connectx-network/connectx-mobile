import StarIcon from '@assets/icons/profile/StarIcon';
import Images from '@assets/images';
import {getSize} from '@base/common/responsive';
import {Block, Image, Text} from '@components';
import Font from '@theme/Font';
import {memo} from 'react';
import {StyleSheet} from 'react-native';

const ItemReview = () => {
  return (
    <Block style={styles.container}>
      <Image source={Images.AVATAR} style={styles.avatar} />
      <Block flex marginLeft={12}>
        <Block row alignCenter marginBottom={6}>
          <Text numberOfLines={1} style={styles.username}>
            Jonny Deep B
          </Text>
          <Text>10 Feb</Text>
        </Block>
        <Block row alignCenter>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </Block>
        <Text numberOfLines={5} style={styles.contentReview}>
          Enjoy your favorite dishe and a lovely your friends and family and
          have a great time.
        </Text>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: getSize.s(20),
    marginBottom: getSize.v(20),
  },
  avatar: {
    width: getSize.m(34),
    height: getSize.m(34),
    borderRadius: getSize.m(17),
  },
  username: {
    fontSize: getSize.m(18, 0.3),
    fontFamily: Font.font_medium_500,
    flex: 1,
    marginRight: getSize.m(12),
  },
  contentReview: {
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_regular_400,
    marginTop: getSize.m(12),
  },
});

export default memo(ItemReview);
