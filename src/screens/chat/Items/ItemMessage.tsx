import Images from '@assets/images';
import {getSize} from '@base/common/responsive';
import {Block, Image, Text} from '@components';
import {navigate} from '@navigation/navigationService';
import {BUBBLE_CHAT_SCREEN} from '@navigation/routes';
import Font from '@theme/Font';
import {FC, memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

interface IProps {}

const ItemMessage: FC<IProps> = () => {
  const handleItem = () => {
    navigate(BUBBLE_CHAT_SCREEN);
  };
  return (
    <TouchableOpacity
      onPress={handleItem}
      activeOpacity={0.5}
      style={styles.container}>
      <Image style={styles.avatar} source={Images.AVATAR} />
      <Block flex>
        <Block row alignCenter marginBottom={6}>
          <Text numberOfLines={1} style={styles.textName}>
            Athalia Putri
          </Text>
          <Text style={styles.textTime}>Today</Text>
        </Block>
        <Text numberOfLines={1} style={styles.textContent}>
          Good morning, did you sleep well?
        </Text>
      </Block>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getSize.s(20),
    marginBottom: getSize.v(12),
    paddingVertical: getSize.v(6),
  },
  avatar: {
    width: getSize.m(48),
    height: getSize.m(48),
    borderRadius: getSize.m(12),
    marginRight: getSize.m(12),
  },
  textName: {
    fontSize: getSize.m(14, 0.3),
    fontFamily: Font.font_semi_bold_600,
    flex: 1,
  },
  textTime: {
    fontFamily: Font.font_regular_400,
    fontSize: getSize.m(10, 0.3),
  },
  textContent: {
    color: '#5BE2FF',
    fontFamily: Font.font_regular_400,
    fontSize: getSize.m(12, 0.3),
  },
});

export default memo(ItemMessage);
