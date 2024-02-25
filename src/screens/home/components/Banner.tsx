import Images from '@assets/images';
import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {Image} from '@components';
import {memo} from 'react';
import {StyleSheet} from 'react-native';

const Banner = () => {
  return <Image source={Images.BANNER_DEFAULT} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: WIDTH_SCREEN - getSize.s(40),
    height: ((WIDTH_SCREEN - getSize.s(40)) * 128) / 320,
    alignSelf: 'center',
    marginTop: getSize.v(20),
  },
});

export default memo(Banner);
