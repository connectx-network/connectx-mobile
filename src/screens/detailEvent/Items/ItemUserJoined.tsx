import Images from '@assets/images';
import {getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {Block, Image, Text} from '@components';
import {navigate} from '@navigation/navigationService';
import {PROFILE_OWNER_EVENT_SCREEN} from '@navigation/routes';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FC, memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

interface IProps {
  avatarUrl: string | null;
  name: string;
  id: string;
}

const ItemUserJoined: FC<IProps> = ({avatarUrl, name, id}) => {
  const handleItem = () => {
    navigate(PROFILE_OWNER_EVENT_SCREEN, {id});
  };
  return (
    <TouchableOpacity
      onPress={handleItem}
      style={styles.container}
      activeOpacity={0.5}>
      <Image
        source={avatarUrl ? {uri: avatarUrl} : Images.AVATAR}
        style={styles.boxIcon}
      />
      <Block row flex alignCenter>
        <Block flex>
          <Text numberOfLines={1} style={styles.textTitleInfo}>
            {name}
          </Text>
          <Text numberOfLines={1} style={styles.textSubInfo}>
            Participated
          </Text>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getSize.m(20),
  },
  boxIcon: {
    width: getSize.m(48),
    height: getSize.m(48),
    borderRadius: getSize.m(12),
    backgroundColor: `${Color.WHITE}10`,
    ...Styles.centerNoFlex,
    marginRight: getSize.m(12),
  },
  textTitleInfo: {
    fontFamily: Font.font_medium_500,
    fontSize: getSize.m(16, 0.3),
    marginBottom: getSize.m(6),
  },
  textSubInfo: {
    fontSize: getSize.m(12, 0.3),
    fontFamily: Font.font_regular_400,
    color: Color.GREEN_HOLDER,
  },
});

export default memo(ItemUserJoined);
