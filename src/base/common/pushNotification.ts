import messaging from '@react-native-firebase/messaging';
import {ReplaySubject} from 'rxjs';
import {debug} from './debug';
import {navigate} from '@navigation/navigationService';
import {NOTIFICATION_SCREEN} from '@navigation/routes';

interface Action {
  type: string;
}

class PushController {
  private static instance: PushController;
  static fcmToken: string | undefined;
  private actionsSubject = new ReplaySubject<Action>(1);
  public readonly actions$ = this.actionsSubject.asObservable();
  private constructor() {}
  static toast = null;

  static getInstance(): PushController {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  async init() {
    await this.requestUserPermission();
    this.backgroundMessageHandler();
    this.onMessageHandler((callBack: any) => {
      debug('callback-message>>', callBack);
    });
  }

  dispatch(action: Action) {
    this.actionsSubject.next(action);
  }

  private updateFcmTokenHandler = async (
    token: string | undefined,
    type: string,
  ) => {
    if (token !== undefined) {
      PushController.fcmToken = token;
      if (type === 'refresh') {
        //Refresh device
      }
    }
  };

  static updateToast = async (value: any) => {
    value && (PushController.toast = value);
  };

  public requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await this.getFcmToken();
      this.updateFcmTokenHandler(token, 'refresh');
      console.log(
        'Authorization status:',
        authStatus,
        token,
        PushController.fcmToken,
      );
    }
  };

  private getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      debug('Your Firebase Token is:', fcmToken);
      return fcmToken;
    } else {
      debug('Failed', 'No token received');
    }
  };

  private backgroundMessageHandler = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      debug('Message handled in the background!', remoteMessage);
    });
  };

  onMessageHandler = (callBack: Function) => {
    messaging().onMessage(async remoteMessage => {
      callBack(remoteMessage);
      const notificationBody = remoteMessage?.notification?.body || '';
      const targetRouteName = remoteMessage?.data?.name;

      try {
        console.log('notificationBody', notificationBody, targetRouteName);
        // Handle message
      } catch (e) {}
    });
  };

  static _onNotificationOpened = (type: any, remoteMessage: any) => {
    debug('_onNotificationOpened<>>>', remoteMessage);
    navigate(NOTIFICATION_SCREEN);
  };

  /**
   * When the application is running, but in the background.
   */
  static backgroundSubscription = messaging().onNotificationOpenedApp(
    (remoteMessage: any) => {
      if (remoteMessage) {
        const {type} = remoteMessage.data;
        this._onNotificationOpened(type, remoteMessage);
      }
    },
  );

  onFcmTokenUpdate = () => {
    messaging().onTokenRefresh(async token => {
      debug('New FCM token generated', token);
      this.updateFcmTokenHandler(token, 'refresh');
    });
  };
}

export default PushController;
