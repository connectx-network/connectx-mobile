import {IconApp} from '@assets/icons';
import CalendarIcon from '@assets/icons/home/CalendarIcon';
import ChatIcon from '@assets/icons/home/ChatIcon';
import CommunityIcon from '@assets/icons/home/CommnunityIcon';
import MapIcon from '@assets/icons/home/MapIcon';
import {getSize} from '@base/common/responsive';
import {Block, Text} from '@components';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FC, memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CHAT_STACK, EVENT_STACK, MAP_STACK} from './routes';

interface IProps extends BottomTabBarProps {}
interface IPropsItemTab {
  keyRoute: string;
  params: {name?: string; icon: any | string; screen: string};
  navigation: any;
  isFocused: boolean;
  name: string;
}

const ItemTab = memo(
  ({params, navigation, isFocused, name, keyRoute}: IPropsItemTab) => {
    const handleTab = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: keyRoute,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(name, params);
      }
    };
    return (
      <Block style={styles.itemTab}>
        {params?.name ? (
          <TouchableOpacity
            onPress={handleTab}
            activeOpacity={0.5}
            style={styles.btnTab}>
            {name === CHAT_STACK ? (
              <ChatIcon color={isFocused ? Color.WHITE : `${Color.WHITE}50`} />
            ) : name === EVENT_STACK ? (
              <CalendarIcon
                color={isFocused ? Color.WHITE : `${Color.WHITE}50`}
              />
            ) : name === MAP_STACK ? (
              <MapIcon color={isFocused ? Color.WHITE : `${Color.WHITE}50`} />
            ) : (
              <CommunityIcon
                color={isFocused ? Color.WHITE : `${Color.WHITE}50`}
              />
            )}
            {params?.name && (
              <Text
                color={isFocused ? Color.WHITE : `${Color.WHITE}50`}
                style={styles.textItemTab}>
                {params.name}
              </Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleTab} activeOpacity={0.5}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={['#5669FF', '#BF56FF']}
              style={styles.tabHome}>
              {params?.icon && (
                <IconApp
                  name={params?.icon}
                  size={getSize.m(22)}
                  color={isFocused ? Color.WHITE : '#29313E'}
                />
              )}
            </LinearGradient>
          </TouchableOpacity>
        )}
      </Block>
    );
  },
);

const BottomTabCustom: FC<IProps> = props => {
  // const [show, setShow] = useState<boolean>(true);
  // useEffect(() => {
  //   const nextRoute = NavigationService.getCurrentRoute();
  //   if (
  //     nextRoute?.name === undefined ||
  //     nextRoute?.name === CHAT_STACK ||
  //     nextRoute?.name === EVENTS_SCREEN ||
  //     nextRoute?.name === HOME_SCREEN ||
  //     nextRoute?.name === MAP_STACK ||
  //     nextRoute?.name === COMMUNITY_STACK ||
  //     nextRoute?.name === DRAWER_STACK
  //   ) {
  //     setShow(true);
  //   } else {
  //     setShow(false);
  //   }
  // }, [NavigationService.getCurrentRoute()]);

  return (
    <Block style={[styles.container]}>
      {props.state.routes.map((route: any, index) => {
        return (
          <ItemTab
            key={route.key}
            {...route}
            keyRoute={route.key}
            isFocused={props.state.index === index}
            navigation={props.navigation}
          />
        );
      })}
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#29313E',
    paddingBottom: getSize.v(15),
    paddingTop: getSize.m(15),
    paddingHorizontal: getSize.s(8),
  },
  itemTab: {
    alignItems: 'center',
    flex: 1,
  },
  btnTab: {
    alignItems: 'center',
  },
  tabHome: {
    alignItems: 'center',
    justifyContent: 'center',
    width: getSize.m(48),
    height: getSize.m(48),
    borderRadius: getSize.m(24),
    transform: [{translateY: -getSize.m(10)}],
  },
  textItemTab: {
    fontSize: getSize.m(12),
    fontFamily: Font.font_regular_400,
    marginTop: getSize.m(4),
  },
});

export default BottomTabCustom;
