import {Icon, IconApp} from '@assets/icons';
import SearchIcon from '@assets/icons/home/SearchIcon';
import {getSize} from '@base/common/responsive';
import {hapticFeedback} from '@base/utils/Utils';
import {Block, Text} from '@components';
import {openDrawer} from '@navigation/navigationService';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FC, useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

interface IProps {}

const Header: FC<IProps> = () => {
  const handleDrawer = useCallback(() => {
    openDrawer();
    hapticFeedback();
  }, []);
  return (
    <Block style={styles.tabBar}>
      <Block row alignCenter flex>
        <TouchableOpacity onPress={handleDrawer} activeOpacity={0.5}>
          <IconApp name={'menu'} color={Color.WHITE} size={getSize.m(18)} />
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.title}>
          Events
        </Text>
      </Block>
      {false && (
        <Block row alignCenter>
          <TouchableOpacity style={styles.btnAction} activeOpacity={0.5}>
            <SearchIcon color={Color.WHITE} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnAction} activeOpacity={0.5}>
            <Icon
              name={'ellipsis-vertical'}
              color={Color.WHITE}
              size={getSize.m(22)}
            />
          </TouchableOpacity>
        </Block>
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getSize.s(20),
    paddingVertical: getSize.m(8),
  },
  title: {
    fontSize: getSize.m(24, 0.3),
    fontFamily: Font.font_medium_500,
    marginLeft: getSize.m(12),
  },
  btnAction: {
    padding: getSize.m(5),
    marginLeft: getSize.m(6),
  },
});

export default Header;
