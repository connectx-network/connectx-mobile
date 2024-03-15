import {Icon} from '@assets/icons';
import {IS_IOS} from '@base/common/constants';
import {HEIGHT_SCREEN, WIDTH_SCREEN, getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {Block, Text} from '@components';
import {useToastMessage} from '@hooks/useToastMessage';
import {goBack, navigate} from '@navigation/navigationService';
import {PROFILE_OWNER_EVENT_SCREEN} from '@navigation/routes';
import Color from '@theme/Color';
import Font from '@theme/Font';
import debounce from 'lodash/debounce';
import {useCallback, useEffect, useState} from 'react';
import {
  InteractionManager,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

const ConnectQrScreen = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const [flash] = useState<boolean>(false);
  const [isCamReady, setIsCamReady] = useState<boolean>(false);
  const [deviceCamera] = useState<'front' | 'back'>('back');
  const {showWarningTop} = useToastMessage();
  const [isRemove, setIsRemove] = useState<boolean>(true);

  const onCameraReady = useCallback(() => {
    debounce(() => setIsCamReady(true), !IS_IOS ? 1000 : 600)();
  }, []);

  useEffect(() => {
    const ubsubcribe1 = navigation.addListener('focus', () => {
      if (IS_IOS) {
        setIsRemove(false);
        onCameraReady();
      } else {
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('transparent', true);
      }

      InteractionManager.runAfterInteractions(() => {
        setIsRemove(false);
      });
    });
    const ubsubcribe2 = navigation.addListener('blur', () => {
      if (!IS_IOS) {
        setIsRemove(true);
      }
    });
    return () => {
      ubsubcribe1();
      ubsubcribe2();
    };
  }, [navigation, onCameraReady]);

  const onCameraRead = useCallback(async ({data}: BarCodeReadEvent) => {
    if (data.includes('https://connectx.network/user/')) {
      const idUser = data.split('https://connectx.network/user/')?.[1];
      return idUser && navigate(PROFILE_OWNER_EVENT_SCREEN, {id: idUser});
    }
    showWarningTop('QR code is invalid!');
  }, []);

  return (
    <SafeAreaView style={Styles.root} edges={[]}>
      <Block style={styles.maskView}>
        <Block style={styles.headerOverlay}>
          <Block style={[styles.rowOption, {paddingTop: top + getSize.m(15)}]}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={goBack}
              style={styles.btnBack}>
              <Icon
                size={getSize.m(26)}
                name={'arrow-back-outline'}
                color={Color.WHITE}
              />
            </TouchableOpacity>
            <Text style={styles.textTitle}>Scan QR code</Text>
            <Text style={styles.textNoteScan}>
              Please scan into the QR code you want to connect
            </Text>
          </Block>
        </Block>
        <Block row>
          <Block style={styles.wall} />
          <Block style={styles.content} />
          <Block style={styles.wall} />
        </Block>
        <Block style={styles.footerOverlay} />
      </Block>
      {!isRemove && (
        <QRCodeScanner
          vibrate={isCamReady}
          cameraProps={{
            androidCameraPermissionOptions: undefined,
            notAuthorizedView: (
              <Text style={styles.textAuthorized}>Camera not authorized</Text>
            ),
            onCameraReady: onCameraReady,
          }}
          checkAndroid6Permissions={false}
          notAuthorizedView={
            <Block flex alignCenter justifyCenter>
              <Text style={styles.textAuthorized}>Camera not authorized</Text>
            </Block>
          }
          permissionDialogTitle='"Esim" Would Like to Access the Camera'
          permissionDialogMessage="Allow Esim to access your camera to scan the QR code."
          reactivate
          reactivateTimeout={2500}
          topViewStyle={styles.topViewStyle}
          bottomViewStyle={styles.topViewStyle}
          cameraStyle={{width: WIDTH_SCREEN, height: HEIGHT_SCREEN}}
          flashMode={
            flash
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off
          }
          onRead={onCameraRead}
          cameraType={deviceCamera}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  maskView: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    flex: 1,
    width: WIDTH_SCREEN,
    height: HEIGHT_SCREEN,
  },
  headerOverlay: {
    height: HEIGHT_SCREEN * 0.25,
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
  },
  rowOption: {
    paddingHorizontal: 20,
  },
  btnBack: {
    marginBottom: getSize.v(8),
    alignSelf: 'flex-start',
    paddingVertical: getSize.m(2),
    paddingRight: getSize.m(4),
  },
  content: {
    width: WIDTH_SCREEN - 40,
    height: WIDTH_SCREEN - 40,
  },
  wall: {
    width: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
  },
  footerOverlay: {
    height: HEIGHT_SCREEN * 0.75 - (WIDTH_SCREEN - 40),
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
  },
  textTitle: {
    fontSize: getSize.m(24, 0.3),
    fontFamily: Font.font_medium_500,
  },
  textNoteScan: {
    marginTop: getSize.m(12),
    fontSize: getSize.m(12, 0.3),
    fontFamily: Font.font_regular_400,
  },
  textAuthorized: {
    textAlign: 'center',
    fontSize: getSize.m(13, 0.3),
    color: Color.BLACK,
    fontFamily: Font.font_regular_400,
  },
  topViewStyle: {flex: 0},
});

export default ConnectQrScreen;
