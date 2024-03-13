import {RANDOM_COLORS} from '@base/common/constants';
import moment from 'moment';
import {HapticFeedbackTypes, trigger} from 'react-native-haptic-feedback';

export const keyExtractor = (item, index) => 'item_' + item?.id + '_' + index;

export function capitalizeFirstLetter(message: string) {
  return message.charAt(0).toUpperCase() + message.slice(1);
}

export const getColorByName = (name: string) => {
  if (name) {
    let colorList = RANDOM_COLORS;
    let index = 0;
    if (name.length > 0) {
      index = name.charCodeAt(0);
      if (index > 65) {
        index -= 65;
      }
      if (name.length > 1) {
        index += name.charCodeAt(1);
        if (index > 65) {
          index -= 65;
        }
      }
    }
    index = index % colorList.length;

    return colorList[index];
  }
  return '#6B7AED';
};

export function getDateEvent(start?: string, end?: string) {
  const dateStart = moment(start).format('DD/MM/YYYY');
  const dateEnd = moment(end).format('DD/MM/YYYY');
  if (dateStart === dateEnd) {
    return dateStart;
  }
  return `${dateStart} - ${dateEnd}`;
}

export function getTimeEvent(start?: string, end?: string) {
  const dateStart = moment(start).format('DD/MM/YYYY');
  const dateEnd = moment(end).format('DD/MM/YYYY');
  if (dateStart === dateEnd) {
    return `${moment(start).format('dddd, h:mm A')} - ${moment(end).format(
      'h:mm A',
    )}`;
  }
  return `${moment(start).format('dddd, h:mm A')} - ${moment(end).format(
    'dddd, h:mm A',
  )}`;
}

export function hapticFeedback(
  type: string |  HapticFeedbackTypes = 'impactLight',
) {
  trigger(type, {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: true,
  });
}
