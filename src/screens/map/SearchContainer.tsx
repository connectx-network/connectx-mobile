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
};

interface IProps {
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
}

const SearchContainer = (
  {children, setShowSearch, showSearch}: PropsWithChildren<IProps>,
  ref,
) => {
  const {top} = useSafeAreaInsets();
  const searchInputRef = useRef<TextInput>();
  const [search, setSearch] = useState<string>('');

  const onBlur = useCallback(() => {
    Keyboard.dismiss();
    searchInputRef.current?.blur();
  }, []);

  useImperativeHandle(ref, () => {
    return {onBlur};
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
    setSearch('');
  }, []);

  return (
    <SafeAreaView style={Styles.container} edges={[]}>
      <SearchBar
        top={top}
        searchInputRef={searchInputRef}
        onFocus={onTapSearch}
        showSearch={showSearch}
        handleBack={handleBack}
        value={search}
        onChangeText={setSearch}
        handleClearText={handleClearText}
      />
      {children}
    </SafeAreaView>
  );
};

export default forwardRef(SearchContainer);
