import {Icon, IconApp} from '@assets/icons';
import AvatarIcon from '@assets/icons/common/AvatarIcon';
import LogoutIcon from '@assets/icons/home/LogoutIcon';
import ProfileIcon from '@assets/icons/home/ProfileIcon';
import {IS_IOS, JWT_KEY, JWT_REFRESH_KEY} from '@base/common/constants';
import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {hapticFeedback, keyExtractor} from '@base/utils/Utils';
import {Block, Image, Text} from '@components';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {actionUpdateAppSetting} from '@redux/slices/appSettingSlice';
import {UserState, actionLogoutUser} from '@redux/slices/userSlice';
import {IRootState} from '@redux/stores';
import {uStateUser} from '@redux/stores/selection';
import Font from '@theme/Font';
import {TColors, useTheme} from '@theme/Theme';
import {useColorScheme} from '@theme/useColorScheme';
import {useStyle} from '@theme/useStyle';
import React, {
  FC,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import * as Keychain from 'react-native-keychain';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgProps} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import NavigationService, {reset} from './navigationService';
import {
  CHAT_SCREEN,
  CHAT_STACK,
  CONNECT_QR_SCREEN,
  DETAIL_EVENT_SCREEN,
  EDIT_PROFILE_SCREEN,
  EVENTS_SCREEN,
  EVENT_STACK,
  HOME_SCREEN,
  HOME_STACK,
  LOGIN_SCREEN,
  MAP_SCREEN,
  MAP_STACK,
  PROFILE_OWNER_EVENT_SCREEN,
  PROFILE_SCREEN,
  PROFILE_STACK,
} from './routes';

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
    name: 'Message',
    screens: [CHAT_SCREEN],
    screen: CHAT_STACK,
    icon: (props?: SvgProps) => (
      <Icon name={'chatbubbles-outline'} size={24} {...props} />
    ),
  },
  {
    name: 'Events',
    screens: [EVENTS_SCREEN],
    screen: EVENT_STACK,
    icon: (props?: SvgProps) => (
      <Icon name={'calendar-outline'} size={24} {...props} />
    ),
  },
  {
    name: 'Map',
    screens: [MAP_SCREEN],
    screen: MAP_STACK,
    icon: (props?: SvgProps) => (
      <Icon name={'location-outline'} size={24} {...props} />
    ),
  },
  {
    name: 'My Profile',
    screens: [PROFILE_SCREEN, EDIT_PROFILE_SCREEN],
    screen: PROFILE_STACK,
    icon: (props?: SvgProps) => <ProfileIcon {...props} />,
  },
  {
    name: 'Connect with QR',
    screens: [CONNECT_QR_SCREEN, PROFILE_OWNER_EVENT_SCREEN],
    screen: CONNECT_QR_SCREEN,
    icon: (props?: SvgProps) => (
      <Icon name={'qr-code-outline'} size={24} {...props} />
    ),
  },
  {
    name: 'Sign Out',
    icon: (props?: SvgProps) => <LogoutIcon {...props} />,
  },
];

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
  }) => {
    const styles = useStyle(getStyles);
    const {colors} = useTheme();
    return (
      <TouchableOpacity
        onPress={handleMenu}
        style={[styles.itemMenu, focused && styles.itemMenuActive]}
        activeOpacity={0.5}>
        {icon({color: focused ? '#5669FF' : colors.mainForeground})}
        <Text
          color={focused ? '#5669FF' : colors.mainForeground}
          style={styles.textTab}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  },
);

const DrawerContent: FC<IProps> = ({}) => {
  const {top} = useSafeAreaInsets();
  const [currentRoute, setCurrentRoute] = useState<string | undefined>(
    NavigationService.getCurrentRoute()?.name,
  );
  const {avatarUrl, fullName} = useSelector<IRootState, UserState>(uStateUser);
  const {colors} = useTheme();
  const {toggle, colorScheme, active} = useColorScheme();
  const styles = useStyle(getStyles);
  const dispatch = useDispatch();

  useEffect(() => {
    const nextRoute = NavigationService.getCurrentRoute();
    if (nextRoute?.name !== currentRoute) {
      setCurrentRoute(nextRoute?.name);
    }
  }, [NavigationService.getCurrentRoute()]);

  const renderItem = useCallback(
    ({item}) => {
      const _handleMenu = async () => {
        hapticFeedback();
        if (item.screen) {
          NavigationService.navigate(item.screen);
        } else {
          reset(LOGIN_SCREEN);
          dispatch(actionLogoutUser());
          await Keychain.resetInternetCredentials(JWT_KEY);
          await Keychain.resetInternetCredentials(JWT_REFRESH_KEY);
          if (auth().currentUser) {
            await auth().signOut();
            !IS_IOS && (await GoogleSignin.revokeAccess());
          }
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

  const tap = Gesture.Tap()
    .runOnJS(true)
    .onStart(e => {
      if (!active) {
        hapticFeedback();
        toggle(e.absoluteX, e.absoluteY);
        dispatch(
          actionUpdateAppSetting({
            colorScheme: colorScheme === 'dark' ? 'light' : 'dark',
          }),
        );
      }
    });

  return (
    <Block style={[styles.container, {paddingTop: top || getSize.m(10)}]}>
      <Block style={styles.modeTheme} top={top || getSize.m(10)}>
        <GestureDetector gesture={tap}>
          <Icon
            name={colorScheme === 'light' ? 'moon-outline' : 'sunny-outline'}
            size={getSize.m(28)}
            color={colors.mainForeground}
          />
        </GestureDetector>
      </Block>
      <Block style={styles.avatarDefault}>
        {avatarUrl ? (
          <Image style={styles.avatar} source={{uri: avatarUrl}} />
        ) : (
          <AvatarIcon />
        )}
      </Block>
      <Text style={styles.username}>{fullName}</Text>
      <FlatList
        data={LIST_MENU}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Block>
  );
};

const getStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.mainBackground,
      flex: 1,
      paddingHorizontal: getSize.s(20),
      width: WIDTH_SCREEN * 0.6,
    },
    avatarDefault: {
      width: getSize.m(60),
      height: getSize.m(60),
      borderRadius: getSize.m(30),
      backgroundColor: '#BCD4F8',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatar: {
      width: getSize.m(60),
      height: getSize.m(60),
      borderRadius: getSize.m(30),
    },
    username: {
      fontSize: getSize.m(19, 0.3),
      fontFamily: Font.font_medium_500,
      marginTop: getSize.m(12),
      marginBottom: getSize.v(30),
      color: colors.mainForeground,
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
    modeTheme: {
      position: 'absolute',
      right: getSize.s(24),
    },
  });

export default memo(DrawerContent);
