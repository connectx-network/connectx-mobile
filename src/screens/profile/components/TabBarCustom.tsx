import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {Block, Text} from '@components';
import Font from '@theme/Font';
import {FC, Fragment, memo, useCallback, useRef, useState} from 'react';
import {LayoutChangeEvent, Pressable, StyleSheet} from 'react-native';
import {ItemLayout} from 'react-native-collapsible-tab-view/lib/typescript/src/MaterialTabBar/types';
import {TabBarProps} from 'react-native-collapsible-tab-view/lib/typescript/src/types';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

interface IProps extends TabBarProps {}

const widthTab = WIDTH_SCREEN - getSize.s(40);

const TabBarCustom: FC<IProps> = ({tabNames, indexDecimal, onTabPress}) => {
  const nTabs = tabNames.length;
  const itemLayoutGathering = useRef(new Map<any, ItemLayout>());
  const [itemsLayout, setItemsLayout] = useState<ItemLayout[]>(
    tabNames.map((_, i) => {
      const tabWidth = widthTab / nTabs;
      return {width: tabWidth, x: i * tabWidth};
    }),
  );

  const onTabItemLayout = useCallback(
    (event: LayoutChangeEvent, name: string) => {
      if (!event.nativeEvent?.layout) return;
      const {width, x} = event.nativeEvent.layout;

      itemLayoutGathering.current.set(name, {
        width,
        x,
      });

      const layout = Array.from(itemLayoutGathering.current.entries())
        .filter(([tabName]) => tabNames.includes(tabName))
        .map(([, layout]) => layout)
        .sort((a, b) => a.x - b.x);

      if (layout.length === tabNames.length) {
        setItemsLayout(layout);
      }
    },
    [tabNames],
  );

  const styleIndicator = useAnimatedStyle(() => {
    const transform =
      itemsLayout.length > 1
        ? [
            {
              translateX: interpolate(
                indexDecimal.value,
                itemsLayout.map((_, i) => i),
                itemsLayout.map(v => v.x),
              ),
            },
          ]
        : undefined;

    const width =
      itemsLayout.length > 1
        ? interpolate(
            indexDecimal.value,
            itemsLayout.map((_, i) => i),
            itemsLayout.map(v => v.width),
          )
        : itemsLayout[0]?.width;

    return {
      transform,
      width,
    };
  }, [indexDecimal, itemsLayout]);

  return (
    <Block marginBottom={8}>
      <Block style={styles.container}>
        {tabNames.map((tab, index) => {
          return (
            <Pressable
              onLayout={event => onTabItemLayout(event, tab)}
              key={index + tab}
              onPress={() => onTabPress(tab)}
              style={({pressed}) => [{opacity: pressed ? 0.5 : 1}, styles.item]}
              android_ripple={{
                borderless: true,
                color: '#DDDDDD',
              }}>
              <Text style={styles.label}>{tab}</Text>
            </Pressable>
          );
        })}
      </Block>
      <Animated.View style={[styles.indicator, styleIndicator]} />
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingHorizontal: getSize.s(20),
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: getSize.s(10),
    paddingVertical: getSize.v(8),
    marginRight: getSize.s(30)
  },
  label: {
    fontSize: getSize.m(16, 0.3),
    fontFamily: Font.font_regular_400,
  },
  indicator: {
    height: getSize.m(3),
    backgroundColor: '#5669FF',
    borderRadius: getSize.m(1.5),
  },
});

export default memo(TabBarCustom);
