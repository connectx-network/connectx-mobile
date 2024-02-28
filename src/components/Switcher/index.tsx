import Styles from '@base/common/styles';
import {FC, PropsWithChildren} from 'react';
import {View} from 'react-native';

interface IProps {
  showSearch: boolean;
}

const Switcher: FC<PropsWithChildren<IProps>> = ({showSearch, children}) => {
  return (
    <>
      <View style={{display: showSearch ? 'flex' : 'none', flex: 1}}>
        {showSearch ? children?.[0] : <View style={Styles.root} />}
      </View>
      <View
        style={{
          display: showSearch ? 'none' : 'flex',
          flex: 1,
        }}>
        {children?.[1]}
      </View>
    </>
  );
};

export default Switcher;
