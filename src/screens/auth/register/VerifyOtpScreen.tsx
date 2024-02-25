import {getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {Block, ButtonGradient, LayoutAuth, Text} from '@components';
import {goBack} from '@navigation/navigationService';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OTPTextView from 'react-native-otp-textinput';
import Icon from 'react-native-vector-icons/Ionicons';

const VerifyOtpScreen = () => {
  return (
    <LayoutAuth>
      <TouchableOpacity
        onPress={goBack}
        style={styles.btnBack}
        activeOpacity={0.5}>
        <Icon
          name={'arrow-back-outline'}
          size={getSize.m(28)}
          color={Color.WHITE}
        />
      </TouchableOpacity>
      <Text style={styles.textSignIn}>Verification</Text>
      <KeyboardAwareScrollView style={Styles.paddingHorizontal}>
        <Text style={styles.textNote}>We’ve send you the verification</Text>
        <Text style={styles.textNote}>code on +1 2620 0323 7631</Text>
        <OTPTextView
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          defaultValue=""
          tintColor={'#5669FF'}
          offTintColor={Color.WHITE}
          autoFocus
        />
        <ButtonGradient style={styles.btnContinue}>
          <Text style={styles.textBtnContinue}>Continue</Text>
        </ButtonGradient>
        <Block alignCenter row justifyCenter>
          <Text style={styles.textReSend}>Re-send code in</Text>
          <Text style={styles.textTime}>0:20</Text>
        </Block>
      </KeyboardAwareScrollView>
    </LayoutAuth>
  );
};

const styles = StyleSheet.create({
  btnBack: {
    marginLeft: getSize.s(15),
    alignSelf: 'flex-start',
    padding: getSize.m(5),
    paddingLeft: getSize.s(5),
    marginBottom: getSize.v(8),
  },
  textSignIn: {
    fontSize: getSize.m(24, 0.3),
    fontFamily: Font.font_medium_500,
    marginLeft: getSize.s(20),
    marginBottom: getSize.v(20),
  },
  textNote: {
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_thin_100,
    marginBottom: getSize.m(6),
  },
  textInputContainer: {
    marginTop: getSize.v(20),
    marginBottom: getSize.v(40),
  },
  roundedTextInput: {
    borderRadius: getSize.m(12),
    borderWidth: getSize.m(2),
    width: getSize.m(54),
    height: getSize.m(54),
    borderBottomWidth: getSize.m(2),
    color: Color.WHITE,
    fontSize: getSize.m(24, 0.3),
    fontFamily: Font.font_medium_500,
  },
  btnContinue: {
    marginHorizontal: getSize.s(20),
    marginBottom: getSize.v(20),
  },
  textBtnContinue: {
    color: '#1F1212',
    fontFamily: Font.font_medium_500,
    fontSize: getSize.m(16),
  },
  textReSend: {
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_thin_100,
    marginRight: getSize.m(6),
  },
  textTime: {
    color: '#5669FF',
    fontSize: getSize.m(15, 0.3),
    fontFamily: Font.font_extra_light_300,
  },
});

export default VerifyOtpScreen;
