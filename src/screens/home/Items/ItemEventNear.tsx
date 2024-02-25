import {Icon} from '@assets/icons';
import SavedActiveIcon from '@assets/icons/home/SavedActiveIcon';
import Images from '@assets/images';
import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {Block, Image, Text} from '@components';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const ItemEventNear = () => {
  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.container}>
      <Image style={styles.image} source={Images.EVENT_NEAR} />
      <Block style={styles.content}>
        <Block>
          <Block row alignCenter space="between">
            <Text style={styles.textDate}>hh/dd/mm/yy</Text>
            <TouchableOpacity activeOpacity={0.5} style={styles.btnSave}>
              <SavedActiveIcon />
            </TouchableOpacity>
          </Block>
          <Text numberOfLines={2} style={styles.textName}>
            Name of Event
          </Text>
        </Block>
        <Block marginTop={12} row alignCenter marginBottom={8}>
          <Icon
            name={'location-sharp'}
            color={Color.WHITE}
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
    marginHorizontal: getSize.s(20),
    marginBottom: getSize.v(12),
    padding: getSize.m(10),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    borderRadius: getSize.m(9),
    width: getSize.s(80),
    height: getSize.s(92),
  },
  textLocation: {
    fontSize: getSize.m(13, 0.3),
    fontFamily: Font.font_regular_400,
    marginLeft: getSize.m(4),
  },
  content: {
    marginLeft: getSize.s(12),
    flex: 1,
    justifyContent: 'space-between',
    height: getSize.s(92),
  },
  textDate: {
    color: '#5669FF',
    fontSize: getSize.m(12, 0.3),
    fontFamily: Font.font_medium_500,
    marginTop: getSize.s(8),
  },
  textName: {
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_medium_500,
    marginTop: getSize.m(4),
  },
  btnSave: {
    paddingLeft: getSize.m(4),
    paddingTop: getSize.m(4),
  },
});

export default memo(ItemEventNear);
