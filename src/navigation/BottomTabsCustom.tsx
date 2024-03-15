import {Icon, IconApp} from '@assets/icons';
import CalendarIcon from '@assets/icons/home/CalendarIcon';
import CommunityIcon from '@assets/icons/home/CommnunityIcon';
import MapIcon from '@assets/icons/home/MapIcon';
import {getSize} from '@base/common/responsive';
import {Block, Text} from '@components';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Font from '@theme/Font';
import {TColors, useTheme} from '@theme/Theme';
import {useStyle} from '@theme/useStyle';
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
    const styles = useStyle(getStyles);
    const {colors} = useTheme();

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
              <Icon
                name={isFocused ? 'chatbubbles' : 'chatbubbles-outline'}
                size={24}
                color={
                  isFocused ? colors.tabColor : `${colors.mainForeground}50`
                }
              />
            ) : name === EVENT_STACK ? (
              <CalendarIcon
                color={
                  isFocused ? colors.tabColor : `${colors.mainForeground}50`
                }
              />
            ) : name === MAP_STACK ? (
              <MapIcon
                color={
                  isFocused ? colors.tabColor : `${colors.mainForeground}50`
                }
              />
            ) : (
              <CommunityIcon
                color={
                  isFocused ? colors.tabColor : `${colors.mainForeground}50`
                }
              />
            )}
            {params?.name && (
              <Text
                color={
                  isFocused ? colors.tabColor : `${colors.mainForeground}50`
                }
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
                  color={
                    isFocused ? colors.mainForeground : colors.mainBackground
                  }
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
  const styles = useStyle(getStyles);
  return (
    <Block style={styles.container}>
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

const getStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.secondaryBackground,
      paddingBottom: getSize.v(15),
      paddingTop: getSize.m(15),
      paddingHorizontal: getSize.s(8),
      shadowColor: colors.shadow,
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 4,
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
