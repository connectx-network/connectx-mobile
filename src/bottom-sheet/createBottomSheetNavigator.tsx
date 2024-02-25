import {RootStackParamList} from '@navigation/routes';
import {
  DefaultNavigatorOptions,
  EventArg,
  NavigationHelpersContext,
  StackActions,
  StackNavigationState,
  StackRouterOptions,
  createNavigatorFactory,
  useNavigationBuilder,
} from '@react-navigation/native';
import {useEffect} from 'react';
import BottomSheetNavigatorView from './BottomSheetNavigatorView';
import {router} from './router';
import {
  BottomSheetNavigationConfig,
  BottomSheetNavigationEventMap,
  BottomSheetNavigationOptions,
} from './types';

type Props = DefaultNavigatorOptions<
  RootStackParamList,
  StackNavigationState<RootStackParamList>,
  BottomSheetNavigationOptions,
  BottomSheetNavigationEventMap
> &
  StackRouterOptions &
  BottomSheetNavigationConfig;

const BottomSheetNavigator = ({
  initialRouteName,
  children,
  screenOptions,
  ...rest
}: Props) => {
  const {state, navigation, descriptors} = useNavigationBuilder<
    StackNavigationState<RootStackParamList>,
    StackRouterOptions,
    Record<string, () => void>,
    BottomSheetNavigationOptions,
    BottomSheetNavigationEventMap
  >(router, {
    children,
    initialRouteName,
    screenOptions,
  });

  useEffect(() => {
    // bottom-sheet types
    // @ts-expect-error: there may not be a tab navigator in parent
    navigation?.addListener?.('tabPress', (e: any) => {
      const isFocused = navigation.isFocused();
      // Run the operation in the next frame so we're sure all listeners have been run
      // This is necessary to know if preventDefault() has been called
      requestAnimationFrame(() => {
        if (
          state.index > 0 &&
          isFocused &&
          !(e as EventArg<'tabPress', true>).defaultPrevented
        ) {
          // When user taps on already focused tab and we're inside the tab,
          // reset the stack to replicate native behaviour
          navigation.dispatch({
            ...StackActions.popToTop(),
            target: state.key,
          });
        }
      });
    });
  }, [navigation, state.index, state.key]);

  console.log('navigation>>', navigation);
  console.log('state>>', state);

  return (
    <NavigationHelpersContext.Provider value={navigation}>
      <BottomSheetNavigatorView
        {...rest}
        // @ts-ignore type mismatch
        descriptors={descriptors}
        navigation={navigation}
        state={state}
      />
    </NavigationHelpersContext.Provider>
  );
};

export const createBottomSheetNavigator = createNavigatorFactory<
  StackNavigationState<RootStackParamList>,
  BottomSheetNavigationOptions,
  BottomSheetNavigationEventMap,
  typeof BottomSheetNavigator
>(BottomSheetNavigator);
