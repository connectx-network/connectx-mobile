import Styles from '@base/common/styles';
import {useCallback, useState} from 'react';
import {Platform, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import MarkerCustom from './components/MarkerCustom';

const MARKER = [
  {
    title: 'event1',
    description: 'test',
    coordinate: {
      latitude: 21.027518812382848,
      longitude: 105.78320091585685,
    },
  },
  {
    title: 'event2',
    description: 'test',
    coordinate: {
      latitude: 21.028872980713523,
      longitude: 105.78542389264247,
    },
  },
  {
    title: 'event3',
    description: 'test',
    coordinate: {
      latitude: 21.025476615914478,
      longitude: 105.78557599106522,
    },
  },
];

const MapScreen = () => {
  const [region, setRegion] = useState({
    latitude: 21.027518812382848,
    longitude: 105.78320091585685,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onRegionChange = useCallback(region => {
    console.log('region>>', region);

    setRegion(region);
  }, []);

  return (
    <SafeAreaView style={Styles.root} edges={[]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={Styles.root}
        initialRegion={region}
        onRegionChange={onRegionChange}>
        {MARKER.map((item, index) => {
          return <MarkerCustom {...item} key={index} />;
        })}
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default MapScreen;
