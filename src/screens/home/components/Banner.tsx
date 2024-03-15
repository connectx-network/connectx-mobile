import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {Block} from '@components';
import Color from '@theme/Color';
import {FC, Fragment, memo, useCallback, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {} from 'react-native-gesture-handler';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import ItemBanner from '../Items/ItemBanner';
import {Event} from '@model/event';

const WIDTH_CONTENT = WIDTH_SCREEN - getSize.s(40);

interface IProps {
  banners: Event[];
}

const Banner: FC<IProps> = ({banners}) => {
  const [index, setIndex] = useState<number>(0);
  const ref = useRef<ICarouselInstance>(null);

  // const onViewRef = useRef(({viewableItems}) => {
  //   if (viewableItems.length > 0) {
  //     const _index = viewableItems[0].index;
  //     setIndex(_index);
  //   }
  // });

  const renderItem = useCallback(({item}: {item: Event}) => {
    return (
      <ItemBanner shortId={item.shortId} uri={item.eventAssets?.[0]?.url} />
    );
  }, []);

  const onSnapToItem = useCallback(newIndex => {
    setIndex(newIndex);
  }, []);

  return (
    banners?.length > 0 && (
      <Fragment>
        <Carousel
          vertical={false}
          loop
          enabled
          height={(WIDTH_CONTENT * 128) / 280}
          width={WIDTH_CONTENT}
          ref={ref}
          style={styles.container}
          autoPlay={true}
          autoPlayInterval={3000}
          data={banners}
          onSnapToItem={onSnapToItem}
          renderItem={renderItem}
        />
        {banners?.length > 1 && (
          <Block row alignCenter justifyCenter marginTop={12}>
            {banners.map((_, _index) => {
              return (
                <Block
                  backgroundColor={
                    index === _index ? '#5669FF' : Color.GRAY_START
                  }
                  key={_index}
                  style={styles.indicator}
                />
              );
            })}
          </Block>
        )}
      </Fragment>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH_CONTENT,
    borderRadius: getSize.m(12),
    alignSelf: 'center',
    marginTop: getSize.m(20),
  },
  indicator: {
    width: getSize.m(6),
    height: getSize.m(6),
    borderRadius: getSize.m(3),
    marginHorizontal: getSize.m(3),
  },
});

export default memo(Banner);
