import Images from '@assets/images';
import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {Block, Image, Text} from '@components';
import Font from '@theme/Font';
import {FC, memo, useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import UserJoined from '../components/UserJoined';
import {Icon, IconApp} from '@assets/icons';
import Color from '@theme/Color';
import {navigate} from '@navigation/navigationService';
import {DETAIL_EVENT_SCREEN} from '@navigation/routes';

interface IProps {}

const ItemEvent: FC<IProps> = () => {
  const handleEvent = useCallback(() => {
    navigate(DETAIL_EVENT_SCREEN);
  }, []);
  return (
    <TouchableOpacity
      onPress={handleEvent}
      activeOpacity={0.5}
      style={styles.container}>
      <Image source={Images.EVENT_IMG} style={styles.image} />
      <Block paddingHorizontal={20} marginBottom={20}>
        <Text numberOfLines={1} style={styles.nameEvent}>
          Name of Event
        </Text>
        <UserJoined />
        <Block marginTop={12} row alignCenter>
          <Icon
            name={'location-sharp'}
            color={`${Color.WHITE}80`}
            size={getSize.m(20)}
          />
          <Text style={styles.textLocation}>Location</Text>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#29313E',
    borderRadius: getSize.m(18),
    width: WIDTH_SCREEN * 0.65,
    marginRight: getSize.s(12),
  },
  image: {
    width: WIDTH_SCREEN * 0.65 - getSize.m(20),
    height: ((WIDTH_SCREEN * 0.65 - getSize.m(20)) * 130) / 220,
    margin: getSize.m(10),
    borderRadius: getSize.m(9),
  },
  nameEvent: {
    fontSize: getSize.m(18, 0.3),
    fontFamily: Font.font_medium_500,
    marginTop: getSize.m(6),
    marginBottom: getSize.m(12),
  },
  textLocation: {
    fontSize: getSize.m(13, 0.3),
    fontFamily: Font.font_regular_400,
    color: `${Color.WHITE}80`,
    marginLeft: getSize.m(6),
  },
});

export default memo(ItemEvent);