import Images from '@assets/images';
import {HEIGHT_SCREEN, WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {Block, Image, Text} from '@components';
import Font from '@theme/Font';
import {memo} from 'react';
import {StyleSheet} from 'react-native';

const NotifyEmpty = () => {
  return (
    <Block style={styles.container}>
      <Image style={styles.image} source={Images.NOTIFY_EMPTY} />
      <Text style={styles.title}>No Notifications!</Text>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEIGHT_SCREEN * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: WIDTH_SCREEN * 0.7,
    height: WIDTH_SCREEN * 0.7,
  },
  title: {
    fontSize: getSize.m(18, 0.3),
    fontFamily: Font.font_medium_500,
  },
});

export default memo(NotifyEmpty);
