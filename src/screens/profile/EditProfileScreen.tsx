import Images from '@assets/images';
import {getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {Block, ButtonGradient, Image, TabBar, Text} from '@components';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputForm from './components/InputForm';
import Font from '@theme/Font';
import {Icon} from '@assets/icons';
import Color from '@theme/Color';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import {useCallback, useState} from 'react';

const EditProfileScreen = () => {
  const [countryCode, setCountryCode] = useState<CountryCode>('VN');
  const [country, setCountry] = useState<Country | null>(null);
  const [showCountry, setShowCountry] = useState<boolean>(false);

  const handleCountry = useCallback(() => {
    setShowCountry(true);
  }, []);

  const onSelect = useCallback((country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  }, []);

  const handleCloseCountryPicker = useCallback(() => {
    setShowCountry(false);
  }, []);

  return (
    <SafeAreaView edges={['top']} style={Styles.container}>
      <TabBar title="Edit Profile" hideRightIcon />
      <KeyboardAwareScrollView style={styles.content}>
        <TouchableOpacity activeOpacity={0.5} style={styles.btnAvatar}>
          <Image style={styles.avatar} source={Images.AVATAR} />
        </TouchableOpacity>
        <InputForm label="Full name" placeholder="..." />
        <InputForm label="Nick name" placeholder="..." />
        <InputForm label="Email" placeholder="..." />
        <InputForm label="Phone number" placeholder="..." />
        <Block row alignCenter>
          <TouchableOpacity
            onPress={handleCountry}
            style={[styles.btnCountry, styles.marginRight]}
            activeOpacity={0.5}>
            <Block style={styles.contentCountry}>
              <Text style={styles.textCountry}>Country</Text>
              <Text style={styles.country}>{country?.region || '...'}</Text>
            </Block>
            <Icon
              name={'caret-down-outline'}
              color={Color.WHITE}
              size={getSize.m(14)}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCountry} activeOpacity={0.5}>
            <Block style={styles.contentCountry}>
              <Text>Country</Text>
              <Text>{country?.region || '...'}</Text>
            </Block>
            <Icon
              name={'caret-down-outline'}
              color={Color.WHITE}
              size={getSize.m(14)}
            />
          </TouchableOpacity>
        </Block>
        <Text style={styles.textError}></Text>
        <InputForm label="Address" placeholder="..." />
        <ButtonGradient
          styleContainer={styles.containerSave}
          isRightIcon={false}
          style={styles.btnSave}>
          <Text style={styles.textSave}>SAVE</Text>
        </ButtonGradient>
      </KeyboardAwareScrollView>
      <Block style={styles.countryPicker}>
        <CountryPicker
          onSelect={onSelect}
          withEmoji
          withFilter
          withFlag
          countryCode={countryCode}
          visible={showCountry}
          onClose={handleCloseCountryPicker}
        />
      </Block>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: getSize.s(20),
  },
  btnAvatar: {
    alignSelf: 'center',
    marginVertical: getSize.v(30),
  },
  avatar: {
    width: getSize.s(96),
    height: getSize.s(96),
    borderRadius: getSize.s(48),
  },
  containerSave: {
    marginBottom: getSize.v(40),
    marginTop: getSize.v(12),
  },
  btnSave: {
    height: getSize.m(50),
  },
  textSave: {
    fontSize: getSize.m(16, 0.3),
    fontFamily: Font.font_medium_500,
  },
  btnCountry: {
    height: getSize.m(54),
    borderRadius: getSize.m(12),
    borderColor: '#757575',
    borderWidth: getSize.m(1),
    backgroundColor: `${Color.WHITE}10`,
    paddingHorizontal: getSize.s(12),
    paddingVertical: getSize.m(8),
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  marginRight: {
    marginRight: getSize.s(20),
  },
  textError: {
    fontSize: getSize.m(13, 0.3),
    fontFamily: Font.font_regular_400,
    marginTop: getSize.m(8),
    marginLeft: getSize.m(4),
    color: `${Color.RED}90`,
    marginBottom: getSize.v(8),
  },
  contentCountry: {
    height: '100%',
    justifyContent: 'space-between',
  },
  textCountry: {
    fontSize: getSize.m(11, 0.3),
  },
  country: {
    fontSize: getSize.m(14, 0.3),
  },
  countryPicker: {
    position: 'absolute',
    opacity: 0,
  },
});

export default EditProfileScreen;