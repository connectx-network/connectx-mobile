import {getSize} from '@base/common/responsive';
import {Block, Text} from '@components';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FC} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

interface IProps extends TextInputProps {
  label: string;
  error?: string;
}

const InputForm: FC<IProps> = ({label, ...props}) => {
  return (
    <Block style={styles.root}>
      <Block style={styles.container}>
        <Text style={styles.textLabel}>{label}</Text>
        <TextInput
          style={styles.textInput}
          placeholderTextColor={`${Color.WHITE}60`}
          {...props}
        />
      </Block>
      <Text style={styles.textError}>{props.error || ''}</Text>
    </Block>
  );
};

const styles = StyleSheet.create({
  root: {
    marginBottom: getSize.v(8),
  },
  container: {
    height: getSize.m(54),
    borderRadius: getSize.m(12),
    borderColor: '#757575',
    borderWidth: getSize.m(1),
    backgroundColor: `${Color.WHITE}10`,
    paddingHorizontal: getSize.s(12),
    paddingTop: getSize.m(6),
    paddingBottom: getSize.m(2),
    justifyContent: 'space-between',
  },
  textLabel: {
    fontSize: getSize.m(11, 0.3),
  },
  textInput: {
    fontSize: getSize.m(14, 0.3),
    color: Color.WHITE,
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  textError: {
    fontSize: getSize.m(13, 0.3),
    fontFamily: Font.font_regular_400,
    marginTop: getSize.m(8),
    marginLeft: getSize.m(4),
    color: `${Color.RED}90`,
  },
});

export default InputForm;
