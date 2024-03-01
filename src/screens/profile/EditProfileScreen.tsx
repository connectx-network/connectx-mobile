import {Icon} from '@assets/icons';
import Images from '@assets/images';
import {getSize} from '@base/common/responsive';
import Styles from '@base/common/styles';
import {Block, ButtonGradient, Image, TabBar, Text} from '@components';
import {useToastMessage} from '@hooks/useToastMessage';
import {EditProfileScreenRouteProp} from '@navigation/routes';
import {UserState, actionUpdateUser} from '@redux/slices/userSlice';
import {IRootState} from '@redux/stores';
import {uStateUser} from '@redux/stores/selection';
import {
  FetchInfoUser,
  UpdateInfoUser,
  UploadAvatar,
} from '@services/user.service';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {useFormik} from 'formik';
import {FC, useCallback, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import {Asset} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import DropdownComponent, {ItemDropbox} from './components/DropdownComponent';
import InputForm from './components/InputForm';
import ModalPickImage from './components/ModalPickImage';
import {goBack} from '@navigation/navigationService';

interface IProps {
  route: EditProfileScreenRouteProp;
}

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required('Full name is required')
    .min(5, 'Full name must be at least 5 characters'),
});

const genders = [
  {label: 'Male', value: 'MALE'},
  {label: 'Female', value: 'FEMALE'},
];

const EditProfileScreen: FC<IProps> = ({route: {params}}) => {
  const {
    fullName,
    nickname,
    email,
    country,
    address,
    gender,
    userInterests,
    id,
    avatarUrl,
  } = useSelector<IRootState, UserState>(uStateUser);
  const [countryCode, setCountryCode] = useState<CountryCode>('VN');
  const [showCountry, setShowCountry] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<Asset | null>(null);
  const {showWarningTop, showSuccessTop} = useToastMessage();
  const dispatch = useDispatch();

  const initialValues = useMemo(
    () => ({
      fullName,
      nickname: nickname || '',
      country,
      address: address || '',
      gender,
      interests: userInterests,
    }),
    [nickname, fullName, country, address, userInterests, gender],
  );

  const handleUpdateInfo = useCallback(
    async (values: typeof initialValues) => {
      try {
        setLoading(true);
        await UpdateInfoUser(values);
        const {data} = await FetchInfoUser(id);
        if (avatar) {
          const {data: dataImage} = await UploadAvatar({
            uri: avatar.uri || '',
            name: avatar.uri || '',
            type: avatar.uri || '',
          });
          setTimeout(() => {
            dispatch(actionUpdateUser({...data, avatarUrl: dataImage.url}));
            params?.refetch?.();
          }, 2000);
        } else {
          dispatch(actionUpdateUser(data));
          params?.refetch?.();
        }
        showSuccessTop('Update profile successfully!');
      } catch (error) {
        showWarningTop('Update profile failed!');
      } finally {
        setLoading(false);
      }
    },
    [id, params?.refetch, avatar],
  );

  const {
    values,
    errors,
    handleChange,
    setFieldError,
    setFieldValue,
    submitForm,
  } = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit: handleUpdateInfo,
  });

  const handleCountry = useCallback(() => {
    setShowCountry(true);
  }, []);

  const onSelect = useCallback(
    (country: Country) => {
      setCountryCode(country.cca2);
      setFieldValue('country', country.name);
    },
    [setFieldValue],
  );

  const handleCloseCountryPicker = useCallback(() => {
    setShowCountry(false);
  }, []);

  const handleChangeValue = (name: string) => (text: string) => {
    handleChange(name)(text);
    setFieldError(name, '');
  };

  const handleChangeSex = useCallback(
    (item: ItemDropbox<any>) => {
      setFieldValue('gender', item.value);
    },
    [setFieldValue],
  );

  const handlePickImage = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleChangeAvatar = useCallback((image?: Asset) => {
    image && setAvatar(image);
    setShowModal(false);
  }, []);

  return (
    <SafeAreaView edges={['top']} style={Styles.container}>
      <TabBar title="Edit Profile" hideRightIcon />
      <KeyboardAwareScrollView style={styles.content}>
        <TouchableOpacity
          onPress={handlePickImage}
          activeOpacity={0.5}
          style={styles.btnAvatar}>
          <Image
            style={styles.avatar}
            source={
              avatar
                ? {uri: avatar.uri}
                : avatarUrl
                ? {uri: avatarUrl}
                : Images.AVATAR
            }
          />
          <Block style={styles.bgAvatar}>
            <Block style={styles.iconCamera}>
              <Icon name={'camera'} color={Color.WHITE} size={getSize.m(18)} />
            </Block>
          </Block>
        </TouchableOpacity>
        <InputForm
          value={values.fullName}
          onChangeText={handleChangeValue('fullName')}
          error={errors.fullName}
          label="Full name"
          placeholder="..."
        />
        <InputForm
          value={values.nickname}
          onChangeText={handleChangeValue('nickname')}
          error={errors.nickname}
          label="Nick name"
          placeholder="..."
        />
        <InputForm
          value={email}
          label="Email"
          placeholder="..."
          editable={false}
        />
        <InputForm label="Phone number" placeholder="..." />
        <Block row alignCenter>
          <TouchableOpacity
            onPress={handleCountry}
            style={[styles.btnCountry, styles.marginRight]}
            activeOpacity={0.5}>
            <Block style={styles.contentCountry}>
              <Text style={styles.textCountry}>Country</Text>
              <Text numberOfLines={1} style={styles.country}>
                {values.country || '...'}
              </Text>
            </Block>
            <Icon
              name={'caret-down-outline'}
              color={Color.WHITE}
              size={getSize.m(14)}
            />
          </TouchableOpacity>
          <DropdownComponent
            placeholder={'...'}
            value={values.gender}
            data={genders}
            onChange={handleChangeSex}
          />
        </Block>
        <Text style={styles.textError}></Text>
        <InputForm
          value={values.address}
          onChangeText={handleChangeValue('address')}
          error={errors.address}
          label="Address"
          placeholder="..."
        />
        <ButtonGradient
          onPress={submitForm}
          disabled={isLoading}
          styleContainer={styles.containerSave}
          isRightIcon={isLoading}
          isLoading={isLoading}
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
      <ModalPickImage
        isVisible={showModal}
        onBackdropPress={handleCloseModal}
        handleImage={handleChangeAvatar}
      />
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
  bgAvatar: {
    width: getSize.s(96),
    height: getSize.s(96),
    borderRadius: getSize.s(48),
    position: 'absolute',
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  iconCamera: {
    backgroundColor: `${Color.BLACK}80`,
    alignItems: 'center',
    paddingVertical: getSize.m(2),
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
    flex: 1,
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
