import Images from '@assets/images';
import {getSize} from '@base/common/responsive';
import {Block, Image} from '@components';
import Color from '@theme/Color';
import {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import {Marker, MapMarkerProps} from 'react-native-maps';

interface IProps extends MapMarkerProps {}

const MarkerCustom: FC<IProps> = ({coordinate}) => {
  return (
    <Marker coordinate={coordinate}>
      <Block style={styles.container}>
        <Block style={styles.box}>
          <Image style={styles.image} source={Images.AVATAR} />
        </Block>
      </Block>
    </Marker>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: getSize.m(8),
  },
  box: {
    backgroundColor: Color.WHITE,
    padding: getSize.m(6),
    borderRadius: getSize.m(8),
    shadowColor: Color.BACKGROUND,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: getSize.m(4),
    shadowOpacity: 0.3,
  },
  image: {
    width: getSize.m(32),
    height: getSize.m(32),
    borderRadius: getSize.m(8),
  },
});

export default memo(MarkerCustom);
