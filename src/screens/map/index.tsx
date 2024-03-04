import {Switcher} from '@components';
import {useCallback, useMemo, useState} from 'react';
import MapHome, {refMap} from './MapHome';
import MapSearch from './MapSearch';
import SearchContainer, {refSearchMap} from './SearchContainer';
import {useFetchEvents} from '@screens/events/hooks';

const MapScreen = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [textSearch, setTextSearch] = useState<string>('');
  const {data} = useFetchEvents({page: 1, size: 10});

  const dataSearch = useMemo(() => {
    return data.filter(item => item.name.includes(textSearch));
  }, [data, textSearch]);

  return (
    <SearchContainer
      ref={refSearchMap}
      showSearch={showSearch}
      setShowSearch={setShowSearch}
      textSearch={textSearch}
      setTextSearch={setTextSearch}>
      <Switcher showSearch={showSearch}>
        <MapSearch data={dataSearch} />
        <MapHome data={dataSearch} ref={refMap} />
      </Switcher>
    </SearchContainer>
  );
};

export default MapScreen;
