import {WIDTH_SCREEN, getSize} from '@base/common/responsive';
import {Block} from '@components';
import {FC, memo} from 'react';
import {Linking, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

interface IProps {
  latitude: number;
  longitude: number;
  location: string;
}

const PreviewMap: FC<IProps> = ({latitude, longitude, location}) => {
  const handlePreview = () => {
    const scheme = Platform.select({
      ios: 'maps://0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${latitude},${longitude}`;
    const label = location;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    url && Linking.openURL(url);
  };

  return (
    <Block>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.container}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        }}>
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        />
      </MapView>
      <TouchableOpacity onPress={handlePreview} style={styles.overlay} />
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH_SCREEN - getSize.s(40),
    height: getSize.v(150),
    borderRadius: getSize.m(20),
    marginBottom: getSize.v(12),
  },
  overlay: {
    width: WIDTH_SCREEN - getSize.s(40),
    height: getSize.v(150),
    position: 'absolute',
    zIndex: 100,
    borderRadius: getSize.m(20),
  },
});

export default memo(PreviewMap);
