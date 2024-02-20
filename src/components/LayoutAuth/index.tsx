import Images from '@assets/images';
import Styles from '@base/common/styles';
import Image from '@components/Image';
import React, {FC, PropsWithChildren, memo} from 'react';
import {StatusBar, StatusBarProps, StyleSheet} from 'react-native';
import {SafeAreaView, Edge} from 'react-native-safe-area-context';

interface IProps extends StatusBarProps {
  edges?: Array<Edge>;
}

const BgImage = memo(() => (
  <Image source={Images.BG_AUTH} style={StyleSheet.absoluteFillObject} />
));

const LayoutAuth: FC<PropsWithChildren<IProps>> = ({
  children,
  barStyle,
  backgroundColor,
  translucent,
  edges,
}) => {
  return (
    <SafeAreaView style={Styles.root} edges={edges || ['top']}>
      <StatusBar
        translucent={translucent !== undefined ? translucent : true}
        barStyle={barStyle || 'light-content'}
        backgroundColor={backgroundColor || 'transparent'}
      />
      <BgImage />
      {children}
    </SafeAreaView>
  );
};

export default LayoutAuth;
