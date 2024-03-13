import {Icon} from '@assets/icons';
import Images from '@assets/images';
import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {hapticFeedback} from '@base/utils/Utils';
import {Block, Image, Text} from '@components';
import {Event} from '@model/event';
import {navigate} from '@navigation/navigationService';
import {DETAIL_EVENT_SCREEN} from '@navigation/routes';
import Font from '@theme/Font';
import {TColors} from '@theme/Theme';
import {useStyle} from '@theme/useStyle';
import {FC, memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import UserJoined from '../components/UserJoined';

interface IProps extends Event {}

const ItemEvent: FC<IProps> = props => {
  const styles = useStyle(getStyles);
  const handleEvent = () => {
    navigate(DETAIL_EVENT_SCREEN, props);
    hapticFeedback();
  };
  return (
    <TouchableOpacity
      onPress={handleEvent}
      activeOpacity={0.5}
      style={styles.container}>
      <Image
        source={
          props.eventAssets?.[0]?.url
            ? {uri: props.eventAssets?.[0]?.url}
            : Images.EVENT_IMG
        }
        style={styles.image}
      />
      <Block paddingHorizontal={20} marginBottom={20}>
        <Text numberOfLines={1} style={styles.nameEvent}>
          {props.name}
        </Text>
        <UserJoined
          totalUser={props._count.joinedEventUsers}
          users={props.joinedEventUsers}
        />
        <Block marginTop={12} row alignCenter>
          <Icon
            name={'location-sharp'}
            size={getSize.m(20)}
            {...styles.iconLocation}
          />
          <Text style={styles.textLocation}>{props.location}</Text>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

const getStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.secondaryBackground,
      borderRadius: getSize.m(18),
      width: WIDTH_SCREEN * 0.65,
      marginRight: getSize.s(12),
      shadowColor: colors.shadow,
      shadowOffset: {width: 0, height: 0},
      elevation: 4,
      shadowOpacity: 0.2,
      shadowRadius: getSize.m(4),
      marginVertical: getSize.m(8),
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
      color: colors.mainForeground,
    },
    textLocation: {
      fontSize: getSize.m(12, 0.3),
      fontFamily: Font.font_regular_400,
      color: `${colors.mainForeground}80`,
      marginLeft: getSize.m(6),
      flex: 1,
    },
    iconLocation: {
      color: `${colors.mainForeground}80`,
    },
  });

export default memo(ItemEvent);
