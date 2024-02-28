import {Switcher} from '@components';
import {useCallback, useState} from 'react';
import MapHome from './MapHome';
import MapSearch from './MapSearch';
import SearchContainer, {refSearchMap} from './SearchContainer';

const MapScreen = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [region, setRegion] = useState({
    latitude: 21.027518812382848,
    longitude: 105.78320091585685,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onRegionChange = useCallback(region => {
    setRegion(region);
  }, []);

  return (
    <SearchContainer
      ref={refSearchMap}
      showSearch={showSearch}
      setShowSearch={setShowSearch}>
      <Switcher showSearch={showSearch}>
        <MapSearch />
        <MapHome region={region} onRegionChange={onRegionChange} />
      </Switcher>
    </SearchContainer>
  );
};

export default MapScreen;
