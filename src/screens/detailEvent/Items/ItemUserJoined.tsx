import {Icon} from '@assets/icons';
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
  company: string | null;
  checkedIn: boolean;
}

const ItemUserJoined: FC<IProps> = ({
  avatarUrl,
  name,
  id,
  company,
  checkedIn,
}) => {
  const handleItem = () => {
    navigate(PROFILE_OWNER_EVENT_SCREEN, {id});
  };
  return (
    <TouchableOpacity
      onPress={handleItem}
      disabled={!__DEV__}
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
          <Block row alignCenter>
            <Icon
              name={'business'}
              color={`${Color.WHITE}90`}
              size={getSize.m(16)}
            />
            <Text numberOfLines={1} style={styles.textSubInfo}>
              {company || 'No company'}
            </Text>
          </Block>
        </Block>
        {checkedIn && (
          <Block row alignCenter marginLeft={8}>
            <Icon
              name={'checkmark-circle-outline'}
              color={Color.GREEN_HOLDER}
              size={getSize.m(18)}
            />
            <Text style={styles.textCheckIn}>Checked</Text>
          </Block>
        )}
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
    marginBottom: getSize.m(4),
  },
  textSubInfo: {
    fontSize: getSize.m(12, 0.3),
    fontFamily: Font.font_regular_400,
    color: Color.WHITE,
    marginLeft: getSize.m(6),
    opacity: 0.7,
  },
  textCheckIn: {
    fontSize: getSize.m(12, 0.3),
    fontFamily: Font.font_medium_500,
    color: Color.GREEN_HOLDER,
    marginLeft: getSize.m(2),
  },
});

export default memo(ItemUserJoined);
