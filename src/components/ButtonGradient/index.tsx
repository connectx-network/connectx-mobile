import {IconApp} from '@assets/icons';
import {getSize} from '@base/common/responsive';
import Block from '@components/Block';
import {FC, PropsWithChildren, memo} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface IProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
  styleContainer?: StyleProp<ViewStyle>;
  rightIcon?: string;
  sizeRightIcon?: number;
  colorRightIcon?: string;
  isRightIcon?: boolean;
  colors?: string[];
}

const ButtonGradient: FC<PropsWithChildren<IProps>> = ({
  children,
  style,
  sizeRightIcon,
  rightIcon,
  colorRightIcon,
  isRightIcon = true,
  styleContainer = {},
  colors,
  ...props
}) => {
  return (
    <TouchableOpacity {...props} activeOpacity={0.5} style={styleContainer}>
      <LinearGradient
        style={StyleSheet.flatten([styles.container, style])}
        colors={colors || ['#5669FF', '#BF56FF']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        {children}
        {isRightIcon && (
          <Block style={styles.iconRight}>
            <IconApp
              name={rightIcon || 'back-right'}
              size={sizeRightIcon || getSize.m(36)}
              color={colorRightIcon || '#1F1212'}
            />
          </Block>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: getSize.m(58),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: getSize.m(12),
    justifyContent: 'center',
  },
  iconRight: {
    position: 'absolute',
    right: getSize.m(12),
  },
});

export default memo(ButtonGradient);
