import Styles from '@base/common/styles';
import {
  PropsWithChildren,
  createRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Keyboard, TextInput} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import SearchBar from './components/SearchBar';

export const refSearchMap = createRef<any>();

export const searchMapControl = {
  onBlur: () => refSearchMap.current?.onBlur(),
  hideSearch: () => refSearchMap.current?.hideSearch(),
};

interface IProps {
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
  setTextSearch: (text: string) => void;
  textSearch: string;
}

const SearchContainer = (
  {
    children,
    setShowSearch,
    showSearch,
    textSearch,
    setTextSearch,
  }: PropsWithChildren<IProps>,
  ref,
) => {
  const {top} = useSafeAreaInsets();
  const searchInputRef = useRef<TextInput>();

  const onBlur = useCallback(() => {
    Keyboard.dismiss();
    searchInputRef.current?.blur();
  }, []);
  const hideSearch = useCallback(() => {
    Keyboard.dismiss();
    searchInputRef.current?.blur();
    setShowSearch(false);
  }, []);

  useImperativeHandle(ref, () => {
    return {onBlur, hideSearch};
  });

  const onTapSearch = useCallback(() => {
    searchInputRef.current?.focus();
    setShowSearch(true);
  }, []);

  const handleBack = useCallback(() => {
    searchInputRef.current?.blur();
    setShowSearch(false);
  }, []);

  const handleClearText = useCallback(() => {
    setTextSearch('');
  }, []);

  return (
    <SafeAreaView style={Styles.container} edges={[]}>
      <SearchBar
        top={top}
        searchInputRef={searchInputRef}
        onFocus={onTapSearch}
        showSearch={showSearch}
        handleBack={handleBack}
        value={textSearch}
        onChangeText={setTextSearch}
        handleClearText={handleClearText}
      />
      {children}
    </SafeAreaView>
  );
};

export default forwardRef(SearchContainer);
