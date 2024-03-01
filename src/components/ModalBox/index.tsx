import {getSize} from '@base/common/responsive';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Modal as ReactNativeModal,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import styles from './styles';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MODAL_ANIM_DURATION = 300;
const MODAL_BACKDROP_OPACITY = 0.4;

interface ModalProps {
  isVisible: boolean;
  setIsVisible?: (value: boolean) => void;
  position?: string;
  backdropStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onBackdropPress?: () => void;
  disabled?: boolean;
  children: ReactNode;
}

const ModalBox: React.FC<ModalProps> = ({
  isVisible,
  setIsVisible,
  position = 'bottom',
  onBackdropPress,
  backdropStyle,
  containerStyle,
  children,
  disabled,
  ...rest
}) => {
  const [modalShow, setModalShow] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animatedValue.stopAnimation();
    if (isVisible) {
      setModalShow(true);
      Animated.timing(animatedValue, {
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
        duration: MODAL_ANIM_DURATION,
        toValue: 1,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
        duration: MODAL_ANIM_DURATION,
        toValue: 0,
      }).start(() => {
        setModalShow(false);
      });
    }
  }, [animatedValue, isVisible, setIsVisible]);

  const backdropAnimatedStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, MODAL_BACKDROP_OPACITY],
    }),
  };

  const contentAnimatedStyle =
    position === 'center'
      ? {
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ],
        }
      : {
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [DEVICE_HEIGHT, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        };

  const onRequestClose = useCallback(() => {
    setIsVisible?.(false);
  }, []);

  return (
    <ReactNativeModal
      transparent
      animationType="none"
      onRequestClose={onRequestClose}
      {...rest}
      visible={modalShow}>
      <TouchableWithoutFeedback disabled={disabled} onPress={onBackdropPress}>
        <Animated.View
          style={[
            styles.backdrop,
            StyleSheet.flatten(backdropStyle),
            backdropAnimatedStyle,
            {width: DEVICE_WIDTH, height: DEVICE_HEIGHT},
          ]}
        />
      </TouchableWithoutFeedback>
      {modalShow && (
        <Animated.View
          style={[
            {
              flex: 1,
              justifyContent: position === 'center' ? 'center' : 'flex-end',
              paddingHorizontal: position === 'center' ? getSize.m(12) : 0,
            },
            contentAnimatedStyle,
            StyleSheet.flatten(containerStyle),
          ]}
          pointerEvents="box-none">
          {children}
        </Animated.View>
      )}
    </ReactNativeModal>
  );
};

export default ModalBox;
