import {IS_IOS} from '@base/common/constants';
import {getSize} from '@base/common/responsive';
import {Block} from '@components';
import Color from '@theme/Color';
import {FC, memo} from 'react';
import {StyleSheet} from 'react-native';
import {Marker} from 'react-native-maps';

interface IProps {
  latitude: number;
  longitude: number;
}

const MarkerSelf: FC<IProps> = ({latitude, longitude}) => {
  return (
    <Marker coordinate={{latitude, longitude}} tracksViewChanges={IS_IOS}>
      <Block style={styles.container}>
        <Block style={styles.circle}>
          <Block style={styles.centerCircle} />
        </Block>
      </Block>
    </Marker>
  );
};

const styles = StyleSheet.create({
  container: {
    width: getSize.m(60),
    height: getSize.m(60),
    borderRadius: getSize.m(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5669FF15',
    borderWidth: 0.5,
    borderColor: '#5669FF40',
  },
  circle: {
    width: getSize.m(20),
    height: getSize.m(20),
    borderRadius: getSize.m(10),
    backgroundColor: Color.WHITE,
    elevation: 4,
    shadowColor: Color.BLACK,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: getSize.m(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerCircle: {
    width: getSize.m(14),
    height: getSize.m(14),
    borderRadius: getSize.m(7),
    backgroundColor: '#5669FF',
  },
});

export default memo(MarkerSelf);
