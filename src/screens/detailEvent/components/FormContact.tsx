import {getSize} from '@base/common/responsive';
import {Block, InputField, Text} from '@components';
import {Contact} from '@model';
import {UserState} from '@redux/slices/userSlice';
import {IRootState} from '@redux/stores';
import {uStateUser} from '@redux/stores/selection';
import Font from '@theme/Font';
import {TColors} from '@theme/Theme';
import {useStyle} from '@theme/useStyle';
import {FormikHelpers, useFormik} from 'formik';
import {
  createRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {LayoutChangeEvent, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';

interface IProps {
  eventId?: string;
  pressSubmit: () => void;
  onSubmit: (
    values: Contact,
    formikHelpers: FormikHelpers<Contact>,
  ) => void | Promise<any>;
}

type TRefForm = {
  submitForm: () => void;
  getPositionError: () => number;
};

export const refFormContract = createRef<TRefForm>();

export const formContactControl = {
  submitForm: () => refFormContract.current?.submitForm(),
  getPositionError: () => refFormContract.current?.getPositionError(),
};

const HEIGHT_INPUT = getSize.m(90);

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  company: Yup.string().required('Company is required'),
  jobTitle: Yup.string().required('Your title is required'),
  telegramId: Yup.string().required('Telegram is required'),
});

const FormContact = ({eventId, pressSubmit, onSubmit}: IProps, ref) => {
  const styles = useStyle(getStyles);
  const [heightContent, setHeightContent] = useState<number>(0);
  const {email, fullName, company} = useSelector<IRootState, UserState>(
    uStateUser,
  );

  const initialValues: Contact = useMemo(
    () => ({
      fullName: fullName || '',
      email: email || '',
      company: company || '',
      companyUrl: '',
      jobTitle: '',
      linkedInUrl: '',
      telegramId: '',
      knowEventBy: '',
      eventId: eventId || '',
    }),
    [eventId],
  );

  const {values, handleChange, errors, submitForm, setErrors} = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit: onSubmit,
  });

  const getPositionError = () => {
    if (Object.keys(errors).length === 0) {
      return 0;
    }
    if (errors.fullName) {
      return heightContent;
    }
    if (errors.email) {
      return heightContent + HEIGHT_INPUT;
    }
    if (errors.company) {
      return heightContent + HEIGHT_INPUT * 2;
    }
    if (errors.jobTitle) {
      return heightContent + HEIGHT_INPUT * 4;
    }
    if (errors.telegramId) {
      return heightContent + HEIGHT_INPUT * 6;
    }
    return 0;
  };

  const handleSubmitForm = async () => {
    await submitForm();
    pressSubmit();
  };

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmitForm,
    getPositionError,
  }));

  const handleChangeValue = (name: string) => (text: string) => {
    handleChange(name)(text);
    setErrors({});
  };

  const onLayout = ({nativeEvent: {layout}}: LayoutChangeEvent) => {
    setHeightContent(layout.y);
  };

  return (
    <Block marginTop={30} onLayout={onLayout}>
      <Text style={styles.textAboutEvent}>Attendee contact details</Text>
      <InputField
        label="Name"
        required
        value={values.fullName}
        onChangeText={handleChangeValue('fullName')}
        error={errors.fullName}
        placeholder="Enter name"
      />
      <InputField
        label="Email"
        required
        value={values.email}
        onChangeText={handleChangeValue('email')}
        error={errors.email}
        placeholder="abc@email.com"
        keyboardType="email-address"
      />
      <InputField
        label="Your company"
        required
        value={values.company}
        onChangeText={handleChangeValue('company')}
        error={errors.company}
        placeholder="Enter your company"
      />
      <InputField
        label="Your company's website"
        value={values.companyUrl}
        onChangeText={handleChangeValue('companyUrl')}
        error={errors.companyUrl}
        placeholder="Enter your company's website"
      />
      <InputField
        label="Your Title"
        required
        value={values.jobTitle}
        onChangeText={handleChangeValue('jobTitle')}
        error={errors.jobTitle}
        placeholder="Enter your title"
      />
      <InputField
        label="Your Linkedin Profile"
        value={values.linkedInUrl}
        onChangeText={handleChangeValue('linkedInUrl')}
        error={errors.linkedInUrl}
        placeholder="Enter your linkedin profile"
      />
      <InputField
        label="Your Telegram ID"
        required
        value={values.telegramId}
        onChangeText={handleChangeValue('telegramId')}
        error={errors.telegramId}
        placeholder="Enter your telegram ID"
      />
      <InputField
        label="How did you find us (ConnectX, Luma, Friend, Organizer, Other)"
        value={values.knowEventBy}
        onChangeText={handleChangeValue('knowEventBy')}
        error={errors.knowEventBy}
        placeholder="ConnectX..."
      />
    </Block>
  );
};

const getStyles = (colors: TColors) =>
  StyleSheet.create({
    textAboutEvent: {
      fontFamily: Font.font_medium_500,
      fontSize: getSize.m(18, 0.3),
      marginBottom: getSize.m(24),
      color: colors.mainForeground,
    },
  });

export default forwardRef(FormContact);
