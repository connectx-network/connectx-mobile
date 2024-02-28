import {Icon} from '@assets/icons';
import SavedActiveIcon from '@assets/icons/home/SavedActiveIcon';
import Images from '@assets/images';
import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {Block, Image, Text} from '@components';
import {goBack} from '@navigation/navigationService';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FC, Fragment, useCallback, useState} from 'react';
import {LayoutChangeEvent, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {HEIGHT_COVER} from '../layout';

interface IProps {
  top: number;
  scrollY: SharedValue<number>;
  title: string;
  banner?: string;
}

const Header: FC<IProps> = ({top, scrollY, title, banner}) => {
  const [heightTabBar, setHeightTabBar] = useState<number>(0);
  const onLayoutTabBar = useCallback(
    ({nativeEvent: {layout}}: LayoutChangeEvent) => {
      setHeightTabBar(layout.height);
    },
    [],
  );

  const styleImageCover = useAnimatedStyle(() => {
    if (!scrollY) {
      return {};
    }
    const translateY = interpolate(
      scrollY.value,
      [-100, 0, HEIGHT_COVER],
      [0, 0, -HEIGHT_COVER],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      scrollY.value,
      [0, -HEIGHT_COVER],
      [1, 1.5],
      Extrapolation.CLAMP,
    );
    return {transform: [{translateY}, {scale}]};
  }, []);

  const styleTabBar = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollY.value,
      [0, HEIGHT_COVER / 2.2],
      [Color.TRANSPARENT, Color.BACKGROUND],
    );
    return {
      backgroundColor,
    };
  }, []);

  return (
    <Fragment>
      <Animated.View style={[styles.cover, styleImageCover]}>
        <LinearGradient
          colors={[Color.BLACK, Color.TRANSPARENT]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={StyleSheet.flatten([
            styles.gradientImage,
            {height: heightTabBar * 1.5},
          ])}
        />
        <Image
          source={banner ? {uri: banner} : Images.BANNER_DEFAULT}
          style={styles.imageCover}
        />
      </Animated.View>
      <Animated.View
        onLayout={onLayoutTabBar}
        style={[styles.tabBar, {paddingTop: top}, styleTabBar]}>
        <Block row alignCenter flex>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={goBack}
            activeOpacity={0.5}>
            <Icon
              name={'arrow-back-outline'}
              color={Color.WHITE}
              size={getSize.m(26)}
            />
          </TouchableOpacity>
          <Text numberOfLines={1} style={styles.title}>
            {title || 'Event Name'}
          </Text>
        </Block>
        <TouchableOpacity activeOpacity={0.5} style={styles.btnSave}>
          <SavedActiveIcon />
        </TouchableOpacity>
      </Animated.View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getSize.s(15),
    paddingVertical: getSize.m(10),
    position: 'absolute',
    zIndex: 100,
  },
  title: {
    fontSize: getSize.m(24, 0.3),
    fontFamily: Font.font_medium_500,
    flex: 1,
  },
  btnBack: {
    padding: getSize.s(5),
  },
  cover: {
    position: 'absolute',
  },
  imageCover: {
    width: WIDTH_SCREEN,
    height: HEIGHT_COVER,
  },
  gradientImage: {
    position: 'absolute',
    width: WIDTH_SCREEN,
    zIndex: 100,
  },
  btnSave: {
    width: getSize.m(36),
    height: getSize.m(36),
    borderRadius: getSize.m(8),
    backgroundColor: Color.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
