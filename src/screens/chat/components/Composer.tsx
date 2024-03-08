import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import Color from '@theme/Color';
import Font from '@theme/Font';
import React, {memo, useCallback, useRef} from 'react';
import {StyleSheet, TextInput} from 'react-native';

function Composer(props) {
  const dimensionsRef = useRef<any>();
  const determineInputSizeChange = useCallback(
    dimensions => {
      if (!dimensions) {
        return;
      }
      if (
        !dimensionsRef ||
        !dimensionsRef.current ||
        (dimensionsRef.current &&
          (dimensionsRef.current.width !== dimensions.width ||
            dimensionsRef.current.height !== dimensions.height))
      ) {
        dimensionsRef.current = dimensions;
        props.onInputSizeChanged(dimensions);
      }
    },
    [props.onInputSizeChanged],
  );
  const handleContentSizeChange = ({nativeEvent: {contentSize}}) =>
    determineInputSizeChange(contentSize);
  return (
    <TextInput
      {...props}
      multiline
      textAlignVertical="center"
      style={[styles.actionInput, {height: props.composerHeight}]}
      onChangeText={props.onTextChanged}
      value={props.text}
      enablesReturnKeyAutomatically
      underlineColorAndroid="transparent"
      keyboardAppearance={'default'}
      accessible
      onContentSizeChange={handleContentSizeChange}
      maxLength={300}
      placeholderTextColor={`${Color.BLACK}70`}
    />
  );
}

const styles = StyleSheet.create({
  actionInput: {
    fontSize: getSize.m(14, 0.3),
    fontFamily: Font.font_regular_400,
    color: '#0F1828',
    backgroundColor: '#F7F7FC',
    minHeight: getSize.m(36),
    paddingHorizontal: getSize.m(12),
    borderRadius: getSize.m(4),
    // width: WIDTH_SCREEN - getSize.m(24 + 82),
    width: WIDTH_SCREEN - getSize.m(24 + 45),
    paddingBottom: getSize.m(5),
    textAlignVertical: 'center',
    paddingTop: getSize.m(8),
    marginTop: getSize.m(10),
  },
});

export default memo(Composer);
