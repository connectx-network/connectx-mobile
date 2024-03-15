import * as Sentry from '@sentry/react-native';
import {Dedupe, ExtraErrorData} from '@sentry/integrations';

export const routingInstrumentation =
  new Sentry.ReactNavigationInstrumentation();

export function setupSentry() {
  Sentry.init({
    dsn: 'https://8521c3afba92fd7025d32aa6ea8ac7c1@o4505702341804032.ingest.us.sentry.io/4506913902952448',
    debug: false,
    environment: __DEV__ ? 'development' : 'production',
    tracesSampleRate: 1.0,
    attachScreenshot: true,
    integrations: [
      new Dedupe(),
      new ExtraErrorData(),
      new Sentry.ReactNativeTracing({
        routingInstrumentation,
      }),
    ],
  });
}
