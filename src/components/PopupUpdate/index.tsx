import {CODE_PUSH_KEY_PROP} from '@base/common/constants';
import {getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import CodePushUtils from '@base/utils/CodePushUtils';
import Block from '@components/Block';
import Text from '@components/Text';
import Color from '@theme/Color';
import Font from '@theme/Font';
import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {AppState, StyleSheet, TouchableOpacity} from 'react-native';
import CodePush from 'react-native-code-push';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

interface IProps {
  children: ReactElement;
}

const MIN_BOTTOM = getSize.v(-100);
const MAX_BOTTOM = getSize.v(30);

function PopupUpdate({children}: IProps) {
  const progress = useSharedValue(0);
  const bottom = useSharedValue(MIN_BOTTOM);
  const [percentUpdate, setPercentUpdate] = useState<number>(0);

  const [isClose, setClose] = useState<boolean>(true);

  const style = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    };
  }, []);

  const styleContainer = useAnimatedStyle(() => {
    return {
      bottom: bottom.value,
    };
  }, []);

  const handleClose = useCallback(() => {
    bottom.value = withSpring(
      MIN_BOTTOM,
      {
        damping: 15,
      },
      () => {
        runOnJS(setClose)(true);
      },
    );
  }, []);

  const checkUpdate = useCallback(async () => {
    try {
      const isUpdate = await CodePush.checkForUpdate(CODE_PUSH_KEY_PROP);
      if (isUpdate) {
        setClose(false);
        CodePushUtils.checkVersion((_status, _message, _percent) => {
          const percent = Math.round(_percent);
          if (percent) {
            if (bottom.value === MIN_BOTTOM) {
              bottom.value = withSpring(MAX_BOTTOM, {
                damping: 10,
              });
            }
            setPercentUpdate(percent);
            progress.value = withTiming(percent);
            if (percent === 100) {
              handleClose();
            }
          }
        });
      }
    } catch (error) {}
  }, []);

  const handleChangeStatusApp = useCallback(
    async (nextAppState: string) => {
      if (nextAppState === 'active') {
        checkUpdate();
      }
    },
    [checkUpdate],
  );

  useEffect(() => {
    CodePush.notifyAppReady();
    const subscription = AppState.addEventListener(
      'change',
      handleChangeStatusApp,
    );
    checkUpdate();

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <>
      {children}
      {!isClose && (
        <Animated.View style={[styles.container, styleContainer]}>
          <Block flex marginRight={12}>
            <Text style={styles.title}>Installing new update</Text>
            <Block style={styles.boxProgress}>
              <Animated.View style={[styles.progress, style]} />
            </Block>
            <Text style={styles.textProgress}>{percentUpdate}%</Text>
          </Block>
          <TouchableOpacity
            onPress={handleClose}
            style={styles.btnClose}
            activeOpacity={0.5}>
            <Icon
              name={'close-outline'}
              size={getSize.m(24)}
              color={Color.BLACK}
            />
          </TouchableOpacity>
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: getSize.v(30),
    backgroundColor: Color.WHITE,
    width: '90%',
    alignSelf: 'center',
    borderRadius: getSize.m(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getSize.s(12),
    paddingVertical: getSize.m(8),
  },
  title: {
    color: Color.BACKGROUND,
    fontFamily: Font.font_medium_500,
    fontSize: getSize.m(14, 0.3),
  },
  btnClose: {
    backgroundColor: `${Color.BLACK}20`,
    width: getSize.m(40),
    height: getSize.m(40),
    ...Styles.centerNoFlex,
    borderRadius: getSize.m(20),
  },
  boxProgress: {
    height: getSize.m(4),
    backgroundColor: `${Color.BLACK}30`,
    marginTop: getSize.m(8),
    marginRight: getSize.m(5),
    borderRadius: getSize.m(2),
  },
  textProgress: {
    color: Color.BACKGROUND,
    fontFamily: Font.font_medium_500,
    fontSize: getSize.m(13, 0.3),
    marginTop: getSize.m(6),
  },
  progress: {
    height: getSize.m(4),
    backgroundColor: Color.GREEN_HOLDER,
    borderRadius: getSize.m(2),
  },
});

export default PopupUpdate;
