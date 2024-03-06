import {getSize} from '@base/common/responsive';
import {keyExtractor} from '@base/utils/Utils';
import {Text} from '@components';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {UserInfo} from '@model/user';
import Color from '@theme/Color';
import Font from '@theme/Font';
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import ItemUserJoined from './Items/ItemUserJoined';
import {useFetchJoinEvent} from './hooks';

interface IProps {
  eventId: string;
}

export const listJoinEventRef = React.createRef<any>();

export const listJoinEventControl = {
  show: () => listJoinEventRef?.current?.show(),
};

const BSListJoinEvent = forwardRef(({eventId}: IProps, ref) => {
  const [isShow, setShow] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const {data, onEndReached} = useFetchJoinEvent({
    page: 1,
    size: 20,
    userId: '',
    eventId,
  });

  const show = useCallback(() => {
    setShow(true);
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  useImperativeHandle(ref, () => {
    return {show};
  });

  const snapPoints = useMemo(() => ['92%'], []);

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

  const renderItem = useCallback(({item}: {item: {user: UserInfo}}) => {
    return (
      <ItemUserJoined
        name={item.user.fullName}
        avatarUrl={item.user.avatarUrl}
        id={item.user.id}
      />
    );
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleChangeIndex}
      index={-1}
      containerStyle={{zIndex: isShow ? 100 : 0}}
      style={styles.container}
      backdropComponent={isShow ? BackdropComponent : null}
      handleIndicatorStyle={styles.handleIndicatorStyle}
      backgroundStyle={styles.container}
      enablePanDownToClose={true}>
      <Text style={styles.textTitle}>List joined event</Text>
      <BottomSheetFlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        onEndReached={onEndReached}
      />
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
  contentContainerStyle: {
    paddingHorizontal: getSize.s(20),
    paddingTop: getSize.m(12),
  },
  handleIndicatorStyle: {
    backgroundColor: '#B2B2B2',
  },
  contentContainer: {
    paddingTop: getSize.v(8),
  },
  textTitle: {
    fontSize: getSize.m(25, 0.3),
    fontFamily: Font.font_regular_400,
    marginLeft: getSize.s(20),
    marginBottom: getSize.m(12),
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: `${Color.WHITE}10`,
    zIndex: 20,
  },
});

export default memo(BSListJoinEvent);
