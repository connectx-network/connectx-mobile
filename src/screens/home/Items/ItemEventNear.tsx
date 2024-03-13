import {Icon} from '@assets/icons';
import Images from '@assets/images';
import {getSize} from '@base/common/responsive';
import {hapticFeedback} from '@base/utils/Utils';
import {Block, Image, Text} from '@components';
import {Event} from '@model/event';
import {navigate} from '@navigation/navigationService';
import {DETAIL_EVENT_SCREEN} from '@navigation/routes';
import Color from '@theme/Color';
import Font from '@theme/Font';
import lodash from 'lodash';
import moment from 'moment';
import {FC, memo} from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
interface IProps extends Event {
  style?: StyleProp<ViewStyle>;
  handleItem?: () => void;
}

const ItemEventNear: FC<IProps> = ({style, ...props}) => {
  const handleItem = () => {
    navigate(DETAIL_EVENT_SCREEN, props);
    hapticFeedback();
  };

  return (
    <TouchableOpacity
      onPress={props.handleItem || handleItem}
      activeOpacity={0.5}
      style={[styles.container, style]}>
      <Image
        style={styles.image}
        source={
          lodash.head(props.eventAssets)?.url
            ? {uri: lodash.head(props.eventAssets)?.url}
            : Images.EVENT_NEAR
        }
      />
      <Block style={styles.content}>
        <Block>
          <Block row alignCenter space="between">
            <Text style={styles.textDate}>
              {moment(props.eventDate).format('hh:mm A - DD/MM/YYYY')}
            </Text>
            <TouchableOpacity activeOpacity={0.5} style={styles.btnSave}>
              {/* <SavedActiveIcon /> */}
            </TouchableOpacity>
          </Block>
          <Text numberOfLines={2} style={styles.textName}>
            {props.name || 'Name of Event'}
          </Text>
        </Block>
        <Block marginTop={8} row alignCenter>
          <Icon
            name={'location-sharp'}
            color={Color.WHITE}
            size={getSize.m(20)}
          />
          <Text numberOfLines={1} style={styles.textLocation}>
            {props.location || 'Location'}
          </Text>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#29313E',
    borderRadius: getSize.m(18),
    marginHorizontal: getSize.s(20),
    marginBottom: getSize.v(12),
    padding: getSize.m(10),
    flexDirection: 'row',
    // alignItems: 'flex-start',
  },
  image: {
    borderRadius: getSize.m(9),
    width: getSize.s(80),
    // maxHeight: getSize.s(92),
    height: '100%',
    minHeight: getSize.s(80),
  },
  textLocation: {
    fontSize: getSize.m(13, 0.3),
    fontFamily: Font.font_regular_400,
    marginLeft: getSize.m(4),
    flex: 1,
  },
  content: {
    marginLeft: getSize.s(12),
    flex: 1,
    justifyContent: 'space-between',
  },
  textDate: {
    color: '#5669FF',
    fontSize: getSize.m(12, 0.3),
    fontFamily: Font.font_medium_500,
    marginTop: getSize.m(4),
  },
  textName: {
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_medium_500,
    marginTop: getSize.m(4),
    marginBottom: getSize.m(4),
  },
  btnSave: {
    paddingLeft: getSize.m(4),
    paddingTop: getSize.m(4),
  },
});

export default memo(ItemEventNear);
