import {getSize} from '@base/common/responsive';
import {getColorByName} from '@base/utils/Utils';
import {Block} from '@components';
import Color from '@theme/Color';
import Font from '@theme/Font';
import {FC, memo, useEffect, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';

interface IProps {
  name: string;
  isChangeInterest: boolean;
  index: number;
  handleChangeItem: (value: string, index: number) => void;
}

const ItemInterest: FC<IProps> = ({
  name,
  isChangeInterest,
  handleChangeItem,
  index,
}) => {
  const [value, setValue] = useState<string>(name);

  const onChangeText = (text: string) => {
    setValue(text);
    handleChangeItem(text, index);
  };

  useEffect(() => {
    setValue(name);
  }, [name]);

  return (
    <Block backgroundColor={getColorByName(value)} style={styles.itemInterest}>
      <TextInput
        editable={isChangeInterest}
        placeholder="Interest"
        style={styles.inputInterest}
        value={value}
        placeholderTextColor={`${Color.BLACK}80`}
        onChangeText={onChangeText}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  itemInterest: {
    height: getSize.m(32),
    borderRadius: getSize.m(16),
    paddingHorizontal: getSize.m(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: getSize.m(12),
    marginRight: getSize.m(8),
  },
  inputInterest: {
    fontSize: getSize.m(13, 0.3),
    fontFamily: Font.font_medium_500,
    color: Color.BACKGROUND,
    minWidth: getSize.m(30),
  },
});

export default memo(ItemInterest);
