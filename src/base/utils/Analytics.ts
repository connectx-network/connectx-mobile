import analytics from '@react-native-firebase/analytics';
import {InteractionManager} from 'react-native';

const trackEvent = ({
  eventName,
  screen,
  buttonName,
}: {
  eventName: string;
  screen?: string;
  buttonName?: string;
}) => {
  InteractionManager.runAfterInteractions(() => {
    analytics().logEvent(eventName, {
      screen: screen,
      button: buttonName,
    });
  });
};

const screenViewer = (screen_name: string, screen_class?: string) => {
  InteractionManager.runAfterInteractions(() => {
    analytics().logScreenView({
      screen_class: screen_class || '',
      screen_name: screen_name,
    });
  });
};

export default {
  trackEvent,
  screenViewer,
};
