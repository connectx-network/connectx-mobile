import {getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {Block, Text} from '@components';
import Color from '@theme/Color';
import Font from '@theme/Font';
import React, {memo, useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

interface IProps {
  replyMessage: any | null;
}

export const HEIGHT_REPLY = getSize.m(50);

function ReplyMessage({replyMessage}: IProps) {
  const height = useSharedValue(0);
  const dispatch = useDispatch();

  useAnimatedReaction(
    () => replyMessage,
    message => {
      if (message) {
        height.value = withTiming(HEIGHT_REPLY, {duration: 200});
      } else {
        height.value = withTiming(0, {duration: 200});
      }
    },
  );

  const style = useAnimatedStyle(() => {
    return {
      height: height.value,
      backgroundColor: Color.WHITE,
    };
  }, []);

  const handleClose = useCallback(() => {
    // dispatch(actionUpdateReplyMessage(null));
  }, []);

  return (
    <Animated.View style={style}>
      {!!replyMessage && (
        <Block style={styles.content}>
          <Block flex>
            <Text numberOfLines={1} style={styles.textTitle}>
              {`Replying ${replyMessage.name}`}
            </Text>
            <Text numberOfLines={1} style={styles.textMessage}>
              {replyMessage.text}
            </Text>
          </Block>
          <Block marginLeft={12}>
            <TouchableOpacity
              style={styles.btnClose}
              onPress={handleClose}
              activeOpacity={0.5}>
              <Icon
                name={'close-outline'}
                size={getSize.m(16)}
                color={Color.BLACK}
              />
            </TouchableOpacity>
          </Block>
        </Block>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textTitle: {
    color: Color.BLACK,
    fontFamily: Font.font_medium_500,
    fontSize: getSize.m(13, 0.3),
  },
  textMessage: {
    color: Color.BLACK,
    opacity: 0.8,
    fontSize: getSize.m(11, 0.3),
    fontFamily: Font.font_regular_400,
    marginTop: getSize.m(4),
  },
  btnClose: {
    width: getSize.m(24),
    height: getSize.m(24),
    borderRadius: getSize.m(12),
    ...Styles.centerNoFlex,
    backgroundColor: `${Color.BLACK}15`,
  },
});

export default memo(ReplyMessage);
