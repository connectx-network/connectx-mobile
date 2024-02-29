import Images from '@assets/images';
import {IS_IOS} from '@base/common/constants';
import {getSize} from '@base/common/responsive';
import {Block, Image} from '@components';
import Color from '@theme/Color';
import {FC, memo, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Marker, MapMarkerProps} from 'react-native-maps';

interface IProps extends MapMarkerProps {}

const MarkerCustom: FC<IProps> = ({coordinate}) => {
  const [reView, setReview] = useState<boolean>(true);
  const doRedraw = () => {
    setReview(false);
  };

  return (
    <Marker coordinate={coordinate} tracksViewChanges={IS_IOS ? true : reView}>
      <Block style={styles.container}>
        <Block style={styles.box}>
          <Image
            onLoadEnd={doRedraw}
            style={styles.image}
            source={Images.AVATAR}
          />
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
    elevation: 4,
  },
  image: {
    width: getSize.m(32),
    height: getSize.m(32),
    borderRadius: getSize.m(8),
  },
});

export default memo(MarkerCustom);
