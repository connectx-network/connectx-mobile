import {IconApp} from '@assets/icons';
import AvatarIcon from '@assets/icons/common/AvatarIcon';
import CalendarIcon from '@assets/icons/home/CalendarIcon';
import ChatIcon from '@assets/icons/home/ChatIcon';
import CommunityIcon from '@assets/icons/home/CommnunityIcon';
import MapIcon from '@assets/icons/home/MapIcon';
import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {keyExtractor} from '@base/utils/Utils';
import {Block, Text} from '@components';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import Color from '@theme/Color';
import Font from '@theme/Font';
import React, {
  FC,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgProps} from 'react-native-svg';
import NavigationService from './navigationService';
import {
  CHAT_STACK,
  COMMUNITY_STACK,
  DETAIL_EVENT_SCREEN,
  EDIT_PROFILE_SCREEN,
  EVENTS_SCREEN,
  EVENT_STACK,
  HOME_SCREEN,
  HOME_STACK,
  MAP_SCREEN,
  MAP_STACK,
  PROFILE_OWNER_EVENT_SCREEN,
  PROFILE_SCREEN,
  PROFILE_STACK,
} from './routes';
import LogoutIcon from '@assets/icons/home/LogoutIcon';
import ProfileIcon from '@assets/icons/home/ProfileIcon';

interface IProps extends DrawerContentComponentProps {}

export const LIST_MENU = [
  {
    name: 'Home',
    screens: [HOME_SCREEN, DETAIL_EVENT_SCREEN, PROFILE_OWNER_EVENT_SCREEN],
    screen: HOME_STACK,
    icon: (props?: SvgProps) => (
      <IconApp
        name={'-icon-_home'}
        size={getSize.m(22)}
        color={props?.color || '#767676'}
      />
    ),
  },
  {
    name: 'My Profile',
    screens: [PROFILE_SCREEN, EDIT_PROFILE_SCREEN],
    screen: PROFILE_STACK,
    icon: (props?: SvgProps) => <ProfileIcon {...props} />,
  },
  {
    name: 'Message',
    screens: [CHAT_STACK],
    screen: CHAT_STACK,
    icon: (props?: SvgProps) => <ChatIcon {...props} />,
  },
  {
    name: 'Events',
    screens: [EVENTS_SCREEN],
    screen: EVENT_STACK,
    icon: (props?: SvgProps) => <CalendarIcon {...props} />,
  },
  {
    name: 'Map',
    screens: [MAP_SCREEN],
    screen: MAP_STACK,
    icon: (props?: SvgProps) => <MapIcon {...props} />,
  },
  {
    name: 'Community',
    screens: [COMMUNITY_STACK],
    screen: COMMUNITY_STACK,
    icon: (props?: SvgProps) => <CommunityIcon {...props} />,
  },
  {
    name: 'Sign Out',
    icon: (props?: SvgProps) => <LogoutIcon {...props} />,
  },
];

const DrawerContent: FC<IProps> = ({}) => {
  const {top} = useSafeAreaInsets();
  const [currentRoute, setCurrentRoute] = useState<string | undefined>(
    NavigationService.getCurrentRoute()?.name,
  );

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
      icon,
    }: {
      name: string;
      focused: boolean;
      handleMenu: () => void;
      icon: (props?: SvgProps) => ReactNode;
    }) => (
      <TouchableOpacity
        onPress={handleMenu}
        style={[styles.itemMenu, focused && styles.itemMenuActive]}
        activeOpacity={0.5}>
        {icon({color: focused ? '#5669FF' : Color.WHITE})}
        <Text color={focused ? '#5669FF' : Color.WHITE} style={styles.textTab}>
          {name}
        </Text>
      </TouchableOpacity>
    ),
  );

  const renderItem = useCallback(
    ({item}) => {
      const _handleMenu = () => {
        if (item.screen) {
          NavigationService.navigate(item.screen);
        }
      };
      return (
        <ItemMenu
          {...item}
          focused={item?.screens?.some(route => route === currentRoute)}
          handleMenu={_handleMenu}
        />
      );
    },
    [currentRoute],
  );

  return (
    <Block style={[styles.container, {paddingTop: top || getSize.m(10)}]}>
      <Block style={styles.avatarDefault}>
        <AvatarIcon />
      </Block>
      <Text style={styles.username}>Jonny Deep</Text>
      <FlatList
        data={LIST_MENU}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.BACKGROUND,
    flex: 1,
    paddingHorizontal: getSize.s(20),
    width: WIDTH_SCREEN * 0.6,
  },
  avatarDefault: {
    width: getSize.m(60),
    height: getSize.m(60),
    borderRadius: getSize.m(60),
    backgroundColor: '#BCD4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontSize: getSize.m(19, 0.3),
    fontFamily: Font.font_medium_500,
    marginTop: getSize.m(12),
    marginBottom: getSize.v(30),
  },
  itemMenu: {
    height: getSize.m(52),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getSize.v(6),
  },
  itemMenuActive: {
    // backgroundColor: Color.BORDER_BOX,
  },
  textTab: {
    fontSize: getSize.m(16, 0.3),
    fontFamily: Font.font_regular_400,
    marginLeft: getSize.m(12),
  },
});

export default memo(DrawerContent);
