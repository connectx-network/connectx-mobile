import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {Image} from '@components';
import {navigate} from '@navigation/navigationService';
import {DETAIL_EVENT_SCREEN} from '@navigation/routes';
import Color from '@theme/Color';
import {FC, memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

interface IProps {
  uri: string | number;
  shortId: string;
}

const ItemBanner: FC<IProps> = ({uri, shortId}) => {
  const handleBanner = () =>
    shortId && navigate(DETAIL_EVENT_SCREEN, {shortId});
  return (
    <TouchableOpacity onPress={handleBanner} activeOpacity={0.9}>
      <Image source={{uri}} style={styles.image} resizeMode={'cover'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: WIDTH_SCREEN - getSize.s(40),
    height: ((WIDTH_SCREEN - getSize.s(40)) * 128) / 280,
    alignSelf: 'center',
    borderRadius: getSize.m(12),
    backgroundColor: `${Color.BACKGROUND}50`,
  },
});

export default memo(ItemBanner);
