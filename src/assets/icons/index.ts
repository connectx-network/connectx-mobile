import icoMoonConfig from '@assets/icons/selection.json';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon');

const Icons = {
  icomoon: CustomIcon,
  ionicons: Ionicons,
};

type IconType = keyof typeof Icons;

const getIconComponent = (componentName: IconType) => {
  if (!Icons[componentName]) {
    return null;
  }
  return Icons[componentName];
};

export const IconApp = getIconComponent('icomoon');
export const Icon = getIconComponent('ionicons');
