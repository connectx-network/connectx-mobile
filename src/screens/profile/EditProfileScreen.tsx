import {Icon} from '@assets/icons';
import Images from '@assets/images';
import {IS_IOS, JWT_KEY, JWT_REFRESH_KEY} from '@base/common/constants';
import {getSize} from '@base/common/responsive';
import {Block, ButtonGradient, Image, TabBar, Text} from '@components';
import {useToastMessage} from '@hooks/useToastMessage';
import {reset} from '@navigation/navigationService';
import {EditProfileScreenRouteProp, LOGIN_SCREEN} from '@navigation/routes';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  UserState,
  actionLogoutUser,
  actionUpdateUser,
} from '@redux/slices/userSlice';
import {IRootState} from '@redux/stores';
import {uStateUser} from '@redux/stores/selection';
import {
  DeleteAccount,
  FetchInfoUser,
  UpdateInfoUser,
  UploadAvatar,
} from '@services/user.service';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {TColors} from '@theme/Theme';
import {useStyle} from '@theme/useStyle';
import {useFormik} from 'formik';
import {FC, useCallback, useMemo, useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import {Asset} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Keychain from 'react-native-keychain';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import DropdownComponent, {ItemDropbox} from './components/DropdownComponent';
import InputForm from './components/InputForm';
import ModalPickImage from './components/ModalPickImage';

interface IProps {
  route: EditProfileScreenRouteProp;
}

const regexNumber = /^[0-9]*$/;

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required('Full name is required')
    .min(5, 'Full name must be at least 5 characters'),
  phoneNumber: Yup.string()
    .matches(regexNumber, 'Invalid phone number')
    .max(10, 'Phone number should be 9 to 10-digit number.')
    .min(9, 'Phone number should be 9 to 10-digit number.'),
});

const genders = [
  {label: 'Male', value: 'MALE'},
  {label: 'Female', value: 'FEMALE'},
  {label: 'Other', value: 'OTHER'},
];

const EditProfileScreen: FC<IProps> = ({route: {params}}) => {
  const styles = useStyle(getStyles);
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
    phoneNumber,
    company,
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
      phoneNumber: phoneNumber || '',
      company: company || '',
    }),
    [nickname, fullName, country, address, userInterests, gender, company],
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
            name: avatar.fileName || '',
            type: avatar.type || '',
          });
          setTimeout(() => {
            dispatch(actionUpdateUser({...data, avatarUrl: dataImage.url}));
            params?.refetch?.();
          }, 3000);
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
    (countrySelect: Country) => {
      setCountryCode(countrySelect.cca2);
      setFieldValue('country', countrySelect.name);
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

  const handleDelete = useCallback(async () => {
    try {
      await DeleteAccount();
      reset(LOGIN_SCREEN);
      dispatch(actionLogoutUser());
      await Keychain.resetInternetCredentials(JWT_KEY);
      await Keychain.resetInternetCredentials(JWT_REFRESH_KEY);
      if (auth().currentUser) {
        await auth().signOut();
        !IS_IOS && (await GoogleSignin.revokeAccess());
      }
      showSuccessTop('Delete account successfully!');
    } catch (error) {
      showWarningTop('Delete account failed!');
    }
  }, []);

  const handleDeleteAccount = useCallback(() => {
    Alert.alert(
      'Delete account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Ok',
          style: 'destructive',
          onPress: handleDelete,
        },
      ],
    );
  }, [handleDelete]);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
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
          value={values.company}
          onChangeText={handleChangeValue('company')}
          error={errors.company}
          label="Company"
          placeholder="..."
        />
        <InputForm
          value={email}
          label="Email"
          placeholder="..."
          editable={false}
        />
        <InputForm
          error={errors.phoneNumber}
          value={values.phoneNumber}
          onChangeText={handleChangeValue('phoneNumber')}
          label="Phone number"
          placeholder="..."
          keyboardType="phone-pad"
        />
        <Block row alignCenter marginBottom={25}>
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
        <TouchableOpacity
          onPress={handleDeleteAccount}
          style={styles.btnDelete}
          activeOpacity={0.5}>
          <Text style={styles.textDelete}>Delete account</Text>
        </TouchableOpacity>
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

const getStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.mainBackground,
    },
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
      marginBottom: getSize.v(30),
      marginTop: getSize.v(12),
    },
    btnSave: {
      height: getSize.m(50),
    },
    btnDelete: {
      marginBottom: getSize.v(40),
      alignSelf: 'center',
      paddingHorizontal: getSize.s(12),
      paddingVertical: getSize.m(6),
    },
    textDelete: {
      color: Color.RED_HOLDER,
      fontFamily: Font.font_medium_500,
      fontSize: getSize.m(14, 0.3),
      textDecorationLine: 'underline',
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
      backgroundColor: `${colors.mainForeground}10`,
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
      color: colors.mainForeground,
    },
    country: {
      fontSize: getSize.m(14, 0.3),
      color: colors.mainForeground,
    },
    countryPicker: {
      position: 'absolute',
      opacity: 0,
    },
  });

export default EditProfileScreen;
