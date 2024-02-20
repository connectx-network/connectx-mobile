import {getSize} from '@base/common/responsive';
import {Block, Text} from '@components';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import Color from '@theme/Color';
import Font from '@theme/Font';
import React, {FC, memo, useCallback, useEffect, useState} from 'react';
import {Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationService from './navigationService';

interface IProps extends DrawerContentComponentProps {}

const DrawerContent: FC<IProps> = ({}) => {
  const {top, bottom} = useSafeAreaInsets();
  const [currentRoute, setCurrentRoute] = useState<string | undefined>(
    NavigationService.getCurrentRoute()?.name,
  );

  const handleClose = useCallback(() => {
    NavigationService.closeDrawer();
  }, []);

  useEffect(() => {
    const nextRoute = NavigationService.getCurrentRoute();
    if (nextRoute?.name !== currentRoute) {
      setCurrentRoute(nextRoute?.name);
    }
  }, [NavigationService.getCurrentRoute()]);

  const ItemMenu = memo(
    ({
      name,
      focused,
      handleMenu,
    }: {
      name: string;
      focused: boolean;
      handleMenu: () => void;
    }) => (
      <TouchableOpacity
        onPress={handleMenu}
        style={[styles.itemMenu, focused && styles.itemMenuActive]}
        activeOpacity={0.5}>
        <Text style={styles.textTab}>{name}</Text>
      </TouchableOpacity>
    ),
  );

  const renderItem = useCallback(
    ({item}) => {
      const _handleMenu = () => NavigationService.navigate(item.screen);
      return (
        <ItemMenu
          {...item}
          focused={item.screens.some(route => route === currentRoute)}
          handleMenu={_handleMenu}
        />
      );
    },
    [currentRoute],
  );

  const handleHotline = useCallback(() => {}, []);

  const handleFacebook = useCallback(() => {
    Linking.openURL('https://www.facebook.com/daugiavpa');
  }, []);
  const handleZalo = useCallback(() => {
    Linking.openURL('https://zalo.me/147568229032205773');
  }, []);

  return (
    <Block style={[styles.container, {paddingTop: top || getSize.m(10)}]}>
      <Block style={styles.header}>
        <TouchableOpacity
          onPress={handleClose}
          style={styles.btnClose}
          activeOpacity={0.5}>
          <Icon
            name={'close-outline'}
            size={getSize.m(18)}
            color={Color.BLACK}
          />
        </TouchableOpacity>
      </Block>
      {/* <FlatList
        data={LIST_MENU}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      /> */}
      <Block style={styles.followMe}>
        <Text style={styles.textFollowMe}>Theo dõi chúng tôi trên</Text>
        <Block row alignCenter>
          <TouchableOpacity
            onPress={handleFacebook}
            style={styles.iconFb}
            activeOpacity={0.5}>
            <Text>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleZalo} activeOpacity={0.5}>
            <Text>Zalo</Text>
          </TouchableOpacity>
        </Block>
      </Block>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleHotline}
        style={[styles.hotline, {marginBottom: bottom || getSize.m(12)}]}>
        <Block>
          <Text style={styles.numberHotline}>1900.0555.15</Text>
          <Text style={styles.noteCall}>Gọi để được hỗ trợ</Text>
        </Block>
      </TouchableOpacity>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.BACKGROUND,
    flex: 1,
    paddingRight: getSize.s(22),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getSize.m(20),
    marginTop: getSize.m(12),
    justifyContent: 'center',
  },
  logo: {
    width: getSize.m(93),
    height: getSize.m(30),
  },
  btnClose: {
    padding: getSize.m(3),
    alignSelf: 'flex-end',
    backgroundColor: '#EBEAEA',
    borderRadius: getSize.m(20),
    position: 'absolute',
    right: 0,
  },
  itemMenu: {
    paddingHorizontal: getSize.s(22),
    borderTopRightRadius: getSize.m(12),
    borderBottomRightRadius: getSize.m(12),
    height: getSize.m(52),
    justifyContent: 'center',
  },
  itemMenuActive: {
    backgroundColor: Color.BORDER_BOX,
  },
  textTab: {
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_semi_bold_600,
  },
  hotline: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: getSize.s(22),
    paddingVertical: getSize.m(12),
  },
  iconCall: {
    width: getSize.m(36),
    height: getSize.m(36),
    borderRadius: getSize.m(18),
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: getSize.m(8),
  },
  numberHotline: {
    color: Color.WHITE,
    fontFamily: Font.font_bold_700,
    fontSize: getSize.m(16, 0.3),
  },
  noteCall: {
    color: '#CBD4E1',
    fontSize: getSize.m(13, 0.3),
    marginTop: getSize.m(2),
    fontFamily: Font.font_regular_400,
  },
  followMe: {
    paddingLeft: getSize.s(22),
    marginBottom: getSize.m(8),
  },
  textFollowMe: {
    color: Color.WHITE,
    fontFamily: Font.font_semi_bold_600,
    marginBottom: getSize.m(4),
    fontSize: getSize.m(15, 0.1),
  },
  iconFb: {
    marginRight: getSize.m(6),
  },
});

export default memo(DrawerContent);
