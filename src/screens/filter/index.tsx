import {Icon} from '@assets/icons';
import CalendarIcon from '@assets/icons/detailEvent/CalendarIcon';
import LocationIcon from '@assets/icons/detailEvent/LocationIcon';
import ArtIcon from '@assets/icons/filter/ArtIcon';
import FoodIcon from '@assets/icons/filter/FoodIcon';
import MusicIcon from '@assets/icons/filter/MusicIcon';
import SportsIcon from '@assets/icons/filter/SportsIcon';
import {getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {keyExtractor} from '@base/utils/Utils';
import {Block, ButtonGradient, Text} from '@components';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import Color from '@theme/Color';
import Font from '@theme/Font';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {SvgProps} from 'react-native-svg';
import ItemTheme from './components/ItemTheme';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

interface IProps {}

const LIST_FILTER_THEME = [
  {
    name: 'Sports',
    icon: (props?: SvgProps) => <SportsIcon {...props} />,
  },
  {
    name: 'Music',
    icon: (props?: SvgProps) => <MusicIcon {...props} />,
  },
  {
    name: 'Art',
    icon: (props?: SvgProps) => <ArtIcon {...props} />,
  },
  {
    name: 'Food',
    icon: (props?: SvgProps) => <FoodIcon {...props} />,
  },
  {
    name: 'Sports',
    icon: (props?: SvgProps) => <SportsIcon {...props} />,
  },
  {
    name: 'Sports',
    icon: (props?: SvgProps) => <SportsIcon {...props} />,
  },
];

export const bottomSheetFilterRef = React.createRef<any>();

export const BSFilterControl = {
  show: () => bottomSheetFilterRef?.current?.show(),
};

const BSFilter = forwardRef(({}: IProps, ref) => {
  const [isShow, setShow] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const show = useCallback(() => {
    setShow(true);
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  useImperativeHandle(ref, () => {
    return {show};
  });

  const snapPoints = useMemo(() => ['92%'], []);

  const renderItem = useCallback(({item}) => {
    return <ItemTheme {...item} />;
  }, []);

  const renderFooter = useCallback(() => {
    return (
      <Block
        row
        alignCenter
        style={Styles.paddingHorizontal}
        paddingTop={6}
        paddingBottom={28}>
        <TouchableOpacity style={styles.btnReset}>
          <Text style={styles.textBtnFooter}>Reset</Text>
        </TouchableOpacity>
        <ButtonGradient
          isRightIcon={false}
          styleContainer={styles.styleContainerApply}>
          <Text style={styles.textBtnFooter}>Apply</Text>
        </ButtonGradient>
      </Block>
    );
  }, []);

  const BackdropComponent = useCallback(() => {
    return (
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={styles.backdrop}
      />
    );
  }, []);

  const handleChangeIndex = useCallback((indexNext: number) => {
    setShow(indexNext === 0);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleChangeIndex}
      index={-1}
      style={styles.container}
      backdropComponent={isShow ? BackdropComponent : null}
      handleIndicatorStyle={styles.handleIndicatorStyle}
      backgroundStyle={styles.container}
      enablePanDownToClose={true}
      footerComponent={renderFooter}>
      <BottomSheetScrollView style={styles.contentContainer}>
        <Text style={styles.textFilter}>Filter</Text>
        <BottomSheetFlatList
          horizontal
          data={LIST_FILTER_THEME}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        />
        <Text style={styles.textTimeAndDate} marginTop={25}>
          Time & Date
        </Text>
        <Block style={styles.optionTime}>
          <ButtonGradient
            isRightIcon={false}
            colors={[Color.TRANSPARENT,Color.TRANSPARENT]}
            style={StyleSheet.flatten([
              styles.btnTime,
              styles.btnTimeInaction,
            ])}>
            <Text style={styles.textBtnOption}>Today</Text>
          </ButtonGradient>
          <ButtonGradient
            isRightIcon={false}
            colors={[Color.TRANSPARENT, Color.TRANSPARENT, Color.TRANSPARENT]}
            style={StyleSheet.flatten([
              styles.btnTime,
              styles.btnTimeInaction,
            ])}>
            <Text style={styles.textBtnOption}>Tomorrow</Text>
          </ButtonGradient>
          <ButtonGradient
            isRightIcon={false}
            colors={[Color.TRANSPARENT, Color.TRANSPARENT]}
            style={StyleSheet.flatten([
              styles.btnTime,
              styles.btnTimeInaction,
            ])}>
            <Text style={styles.textBtnOption}>This week</Text>
          </ButtonGradient>
          <ButtonGradient
            isRightIcon={false}
            colors={[Color.TRANSPARENT, Color.TRANSPARENT]}
            style={StyleSheet.flatten([
              styles.btnTime,
              styles.btnTimeInaction,
            ])}>
            <CalendarIcon color={'#5669FF'} />
            <Text marginLeft={12} marginRight={6} style={styles.textBtnOption}>
              Choose from calender
            </Text>
            <Icon
              size={getSize.m(16)}
              name={'chevron-forward-outline'}
              color={'#5669FF'}
            />
          </ButtonGradient>
        </Block>
        <Text marginTop={12} style={styles.textTimeAndDate}>
          Location
        </Text>
        <TouchableOpacity activeOpacity={0.5} style={styles.btnLocation}>
          <ButtonGradient
            style={styles.boxLocation}
            isRightIcon={false}
            disabled>
            <Block>
              <LocationIcon />
            </Block>
          </ButtonGradient>
          <Text style={styles.textLocation}>New Yourk, USA</Text>
          <Icon
            size={getSize.m(20)}
            name={'chevron-forward-outline'}
            color={'#5669FF'}
          />
        </TouchableOpacity>
        <Block row alignCenter space="between">
          <Text marginTop={25} style={styles.textTimeAndDate}>
            Select price range
          </Text>
          <Text marginTop={25} style={styles.textRangePrice}>
            $20-$120
          </Text>
        </Block>
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.BACKGROUND,
    borderTopLeftRadius: getSize.m(28),
    borderTopRightRadius: getSize.m(28),
    paddingTop: getSize.m(4),
  },
  handleIndicatorStyle: {
    backgroundColor: '#B2B2B2',
  },
  contentContainer: {
    paddingTop: getSize.v(8),
  },
  textFilter: {
    fontSize: getSize.m(25, 0.3),
    fontFamily: Font.font_regular_400,
    marginLeft: getSize.s(20),
  },
  contentContainerStyle: {
    paddingLeft: getSize.s(20),
    marginTop: getSize.v(20),
  },
  textTimeAndDate: {
    fontSize: getSize.m(16, 0.3),
    fontFamily: Font.font_medium_500,
    marginLeft: getSize.s(20),
    marginBottom: getSize.v(20),
  },
  textRangePrice: {
    fontSize: getSize.m(18, 0.3),
    fontFamily: Font.font_medium_500,
    marginRight: getSize.s(20),
    marginBottom: getSize.v(20),
    color: '#38BFDD',
  },
  optionTime: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: getSize.s(20),
  },
  btnTime: {
    height: getSize.m(42),
    borderRadius: getSize.m(12),
    paddingHorizontal: getSize.m(14),
    marginRight: getSize.s(12),
    marginBottom: getSize.v(12),
    flexDirection: 'row',
  },
  btnTimeInaction: {
    borderColor: Color.WHITE,
    borderWidth: getSize.m(1),
  },
  textBtnOption: {
    fontFamily: Font.font_regular_400,
    fontSize: getSize.m(15, 0.3),
  },
  btnReset: {
    height: getSize.m(58),
    flex: 4,
    marginRight: getSize.s(20),
    ...Styles.centerNoFlex,
    borderWidth: getSize.m(1),
    borderColor: Color.WHITE,
    borderRadius: getSize.m(12),
  },
  styleContainerApply: {
    flex: 6,
  },
  textBtnFooter: {
    fontSize: getSize.m(16, 0.3),
    fontFamily: Font.font_medium_500,
  },
  btnLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: getSize.s(20),
    height: getSize.m(60),
    borderColor: Color.WHITE,
    borderRadius: getSize.m(18),
    borderWidth: getSize.m(1),
    paddingHorizontal: getSize.m(8),
  },
  boxLocation: {
    width: getSize.m(44),
    height: getSize.m(44),
    borderRadius: getSize.m(9),
    backgroundColor: Color.BACKGROUND,
  },
  textLocation: {
    fontSize: getSize.m(16, 0.3),
    fontFamily: Font.font_regular_400,
    marginLeft: getSize.m(12),
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: `${Color.WHITE}10`,
  },
});

export default BSFilter;
