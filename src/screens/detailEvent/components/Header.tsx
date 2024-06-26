import Images from '@assets/images';
import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {Block, Image} from '@components';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {useTheme} from '@theme/Theme';
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
import IconVt from 'react-native-vector-icons/Ionicons';
import {HEIGHT_COVER} from '../layout';

interface IProps {
  top: number;
  scrollY: SharedValue<number>;
  title: string;
  banner?: string;
  handleBack: () => void;
  heightCover: number;
}

const Icon = Animated.createAnimatedComponent<any>(IconVt);

const Header: FC<IProps> = ({
  top,
  scrollY,
  title,
  banner,
  handleBack,
  heightCover,
}) => {
  const {colorScheme, colors} = useTheme();
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
      [-100, 0, heightCover || HEIGHT_COVER],
      [0, 0, -(heightCover || HEIGHT_COVER)],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      scrollY.value,
      [0, -(heightCover || HEIGHT_COVER)],
      [1, 1.5],
      Extrapolation.CLAMP,
    );
    return {transform: [{translateY}, {scale}]};
  }, [heightCover]);

  const styleTabBar = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollY.value,
      [0, (heightCover || HEIGHT_COVER) / 2.2],
      [Color.TRANSPARENT, colors.mainBackground],
    );
    return {
      backgroundColor,
    };
  }, [colors.mainBackground, heightCover]);

  const styleTitle = useAnimatedStyle(() => {
    const color = interpolateColor(
      scrollY.value,
      [0, (heightCover || HEIGHT_COVER) / 2.2],
      [colors.mainBackground, colors.mainForeground],
    );
    return {
      color,
    };
  }, [colors.mainForeground, colors.mainBackground, heightCover]);

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
          style={StyleSheet.flatten([
            styles.imageCover,
            heightCover && {height: heightCover},
          ])}
          resizeMode={'cover'}
        />
      </Animated.View>
      <Animated.View
        onLayout={onLayoutTabBar}
        style={[styles.tabBar, {paddingTop: top}, styleTabBar]}>
        <Block row alignCenter flex>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={handleBack}
            activeOpacity={0.5}>
            <Icon
              name={'arrow-back-outline'}
              size={getSize.m(26)}
              style={
                colorScheme === 'light' ? styleTitle : {color: Color.WHITE}
              }
            />
          </TouchableOpacity>
          <Animated.Text
            numberOfLines={1}
            style={[styles.title, colorScheme === 'light' && styleTitle]}>
            {title}
          </Animated.Text>
        </Block>
        {/* <TouchableOpacity
          onPress={handleShare}
          activeOpacity={0.5}
          style={styles.btnSave}>
          <SavedActiveIcon />
        </TouchableOpacity> */}
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
    zIndex: 10,
  },
  title: {
    fontSize: getSize.m(24, 0.1),
    fontFamily: Font.font_medium_500,
    flex: 1,
    color: Color.WHITE,
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
    zIndex: 10,
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
