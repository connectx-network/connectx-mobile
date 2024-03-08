import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {Block, Text} from '@components';
import Color from '@theme/Color';
import Font from '@theme/Font';
import moment from 'moment';
import React, {Fragment, memo, useCallback} from 'react';
import {LayoutChangeEvent, StyleSheet, TouchableOpacity} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
// import LinkPreview from './LinkPreview';

interface IProps {
  setHeightMessage?: (height: number) => void;
  idMe: number;
  user: any;
  isHidden?: boolean;
  text: string;
  createdAt: string;
  handleReply: () => void;
  replyData?: {
    messageRepliedId: string;
    messageText: string;
    userName: string;
    userId: number;
  };
}

const ACTIVE_REPLY = getSize.m(30);

function ContentMessage({
  setHeightMessage,
  idMe,
  user,
  isHidden,
  text,
  createdAt,
  handleReply,
  replyData,
}: IProps) {
  const translateX = useSharedValue(0);
  const onLayout = useCallback(({nativeEvent}: LayoutChangeEvent) => {
    setHeightMessage && setHeightMessage(nativeEvent.layout.height);
  }, []);

  // const onGestureEvent = Gesture.Pan().onStart((e) => {
  //   e.x = translateX.value;
  // }).onChange((e) => {
  //   if (
  //     (e.x + e.translationX < 0 && idMe === user?._id) ||
  //     (e.x + e.translationX > 0 && idMe !== user?._id)
  //   ) {
  //     translateX.value = (e.x + e.translationX) / 3;
  //   }
  // }).onEnd(() => {
  //   if (
  //     idMe === user?._id
  //       ? translateX.value < -ACTIVE_REPLY
  //       : translateX.value > ACTIVE_REPLY
  //   ) {
  //     runOnJS(handleReply)();
  //   }
  //   translateX.value = withTiming(0);
  // })

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number; y: number}
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({translationX}, ctx) => {
      if (
        (ctx.x + translationX < 0 && idMe === user?._id) ||
        (ctx.x + translationX > 0 && idMe !== user?._id)
      ) {
        translateX.value = (ctx.x + translationX) / 3;
      }
    },
    onEnd: () => {
      if (
        idMe === user?._id
          ? translateX.value < -ACTIVE_REPLY
          : translateX.value > ACTIVE_REPLY
      ) {
        runOnJS(handleReply)();
      }
      translateX.value = withTiming(0);
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  }, []);

  const styleIcon = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [
        ACTIVE_REPLY * 0.8 * (idMe === user?._id ? -1 : 1),
        ACTIVE_REPLY * 2 * (idMe === user?._id ? -1 : 1),
      ],
      [0, 1],
    );
    const translationX = interpolate(
      translateX.value,
      [
        ACTIVE_REPLY * (idMe === user?._id ? -1 : 1),
        ACTIVE_REPLY * 3 * (idMe === user?._id ? -1 : 1),
      ],
      [0, (ACTIVE_REPLY / 2) * (idMe === user?._id ? -1 : 1)],
    );
    return {
      opacity,
      transform: [{translateX: translationX}],
    };
  }, [idMe, user?._id]);

  return (
    <Block row alignCenter>
      <Animated.View
        style={[
          styles.iconReply,
          idMe === user?._id && styles.iconReplyMe,
          styleIcon,
        ]}>
        <Icon name={'arrow-undo'} size={getSize.m(18)} color={Color.BLACK} />
      </Animated.View>
      <Animated.View style={style}>
        <PanGestureHandler
          activeOffsetX={[-10, 10]}
          onGestureEvent={onGestureEvent}>
          <Animated.View>
            <TouchableOpacity
              activeOpacity={0.6}
              onLayout={onLayout}
              // onLongPress={handleLongPress}
              style={[
                styles.container,
                idMe === user?._id
                  ? {borderBottomRightRadius: 0}
                  : {
                      borderBottomLeftRadius: 0,
                    },
              ]}>
              {!!replyData?.userId && (
                <Block style={styles.boxReply}>
                  <Text style={styles.textNameReply}>
                    {idMe === replyData.userId ? 'You' : replyData.userName}
                  </Text>
                  <Text numberOfLines={2} style={styles.textMessageReply}>
                    {replyData.messageText}
                  </Text>
                </Block>
              )}
              {isHidden ? (
                <Text style={styles.linkDelete}>Invalid message</Text>
              ) : (
                <Fragment>
                  {idMe === user?._id && (
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 0, y: 1}}
                      colors={['#6465FF', '#985CFF']}
                      style={StyleSheet.flatten([
                        styles.background,
                        idMe === user?._id
                          ? {borderBottomRightRadius: 0}
                          : {
                              borderBottomLeftRadius: 0,
                            },
                      ])}
                    />
                  )}
                  {true ? (
                    <Text style={styles.textMessage}>{text}</Text>
                  ) : (
                    <Block />
                    // <LinkPreview
                    //   handleLongPress={handleLongPress}
                    //   isLeft={idMe !== user?._id}
                    //   text={text}
                    // />
                  )}
                  <Text
                    style={[
                      styles.textDate,
                      {textAlign: idMe === user?._id ? 'right' : 'left'},
                    ]}>
                    {moment(createdAt).fromNow()}
                  </Text>
                </Fragment>
              )}
              {/* <Block
                style={[
                  styles.react,
                  idMe === user?._id ? styles.reactLeft : styles.reactRight,
                ]}>
                {!!totalDislike && (
                  <TouchableOpacity
                    onPress={handleDisLike}
                    activeOpacity={0.5}
                    style={styles.boxReact}>
                    <Text style={styles.iconReact}>👎</Text>
                    <Text style={styles.textNumberReact}>{totalDislike}</Text>
                  </TouchableOpacity>
                )}
                {!!totalLike && (
                  <TouchableOpacity
                    onPress={handleLike}
                    activeOpacity={0.5}
                    style={styles.boxReact}>
                    <Text style={styles.iconReact}>👍</Text>
                    <Text style={styles.textNumberReact}>{totalLike}</Text>
                  </TouchableOpacity>
                )}
              </Block> */}
            </TouchableOpacity>
            {/* <TouchableOpacity
              // onPress={handleLongPress}
              style={[
                styles.btnReact,
                idMe === user?._id
                  ? {
                      left: getSize.m(-28),
                    }
                  : {
                      right: getSize.m(-28),
                    },
              ]}
              activeOpacity={0.5}>
              <Icon
                name={'happy-outline'}
                color={`${Color.WHITE}95`}
                size={getSize.m(18)}
              />
            </TouchableOpacity> */}
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 16,
    backgroundColor: '#4C7397',
    maxWidth: WIDTH_SCREEN * 0.65,
    minWidth: getSize.m(100),
  },
  background: {
    borderRadius: 16,
    ...StyleSheet.absoluteFillObject,
  },
  textDate: {
    fontSize: getSize.m(10, 0.3),
    fontFamily: Font.font_regular_400,
    marginTop: getSize.m(4),
  },
  textMessage: {
    fontSize: getSize.m(14, 0.3),
    fontFamily: Font.font_regular_400,
  },
  linkDelete: {
    color: Color.RED,
    fontSize: getSize.m(14, 0.3),
    fontFamily: Font.font_medium_500,
    opacity: 0.7,
  },
  react: {
    position: 'absolute',
    bottom: getSize.m(-20),
    height: getSize.m(30),
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100,
  },
  reactLeft: {
    left: getSize.m(5),
    flexDirection: 'row-reverse',
  },
  reactRight: {
    right: getSize.m(5),
  },
  boxReact: {
    height: getSize.m(22),
    borderRadius: getSize.m(11),
    paddingHorizontal: getSize.m(6),
    backgroundColor: Color.RED,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: getSize.m(6),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: Color.BLACK,
    shadowOpacity: 0.5,
    shadowRadius: getSize.m(8),
    elevation: 3,
  },
  iconReact: {
    fontSize: getSize.m(13, 0.3),
  },
  textNumberReact: {
    color: Color.WHITE,
    fontFamily: Font.font_regular_400,
    fontSize: getSize.m(12, 0.3),
    marginLeft: getSize.m(2),
  },
  iconReply: {
    position: 'absolute',
    backgroundColor: '#4C7397',
    width: getSize.m(30),
    height: getSize.m(30),
    borderRadius: getSize.m(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconReplyMe: {
    right: 0,
  },
  btnReact: {
    position: 'absolute',
    zIndex: 100,
    padding: getSize.m(5),
  },
  boxReply: {
    backgroundColor: '#EDEDED',
    borderRadius: getSize.m(4),
    zIndex: 100,
    paddingHorizontal: getSize.m(8),
    paddingVertical: getSize.m(6),
    marginBottom: getSize.m(6),
  },
  textNameReply: {
    fontSize: getSize.m(11, 0.3),
    fontFamily: Font.font_semi_bold_600,
    color: Color.YELLOW,
  },
  textMessageReply: {
    fontSize: getSize.m(12, 0.3),
    fontFamily: Font.font_regular_400,
    color: '#1B2B48',
    marginTop: getSize.m(4),
  },
});

export default memo(ContentMessage);
