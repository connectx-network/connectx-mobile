import {
  CommonActions,
  StackActions,
  NavigationContainerRef,
  DrawerActions,
  Route,
} from '@react-navigation/native';

let navigator: NavigationContainerRef<{}>;

export function setTopLevelNavigator(
  navigatorRef: NavigationContainerRef<{}>,
): void {
  navigator = navigatorRef;
}

export function setParams(params: object) {
  navigator?.dispatch(CommonActions.setParams(params));
}

export function checkCanGoBack() {
  return navigator?.canGoBack();
}

export function navigate(name: string, params: object = {}, key?: any): void {
  navigator?.dispatch(
    CommonActions.navigate({name, params, ...(!!key && {key})}),
  );
}

export function goBack(): void {
  navigator?.dispatch(CommonActions.goBack());
}

export function pop(numberPop: number = 1): void {
  navigator?.dispatch(StackActions.pop(numberPop));
}

export function push(name: string, params: object = {}): void {
  navigator?.dispatch(StackActions.push(name, params));
}

export function replace(name: string, params: object = {}): void {
  navigator?.dispatch(StackActions.replace(name, params));
}

export function popToTop(): void {
  navigator?.dispatch(StackActions.popToTop());
}

export function reset(name: string, params: object = {}): void {
  navigator?.dispatch(
    CommonActions.reset({index: 0, routes: [{name, params}]}),
  );
}

export function openDrawer(): void {
  navigator?.dispatch(DrawerActions.openDrawer());
}

export function closeDrawer(): void {
  navigator?.dispatch(DrawerActions.closeDrawer());
}

export function toggleDrawer(): void {
  navigator?.dispatch(DrawerActions.toggleDrawer());
}

export function getCurrentOptions(): object | undefined {
  return navigator?.getCurrentOptions();
}

export function getCurrentRoute():
  | Route<string, object | undefined>
  | undefined {
  return navigator?.getCurrentRoute();
}

export function resetRoute(routesFilter: string[], route: any) {
  navigator?.dispatch(state => {
    let routes = state.routes;

    routesFilter.forEach(item => {
      routes = state.routes.filter(i => i.name !== item);
    });

    return CommonActions.reset({
      ...state,
      routes: [...routes, route],
      index: routes.length,
    });
  });
}

function handleAction(name, params = {}, isReplace = false) {
  if (!navigator) {
    return;
  }
  const action = (isReplace ? StackActions.replace : CommonActions.navigate)(
    name,
    params,
  );
  navigator?.dispatch(action);
}

function dispatch(actions: any): void {
  navigator.dispatch(actions);
}

const NavigationService = {
  goBack,
  navigate,
  setTopLevelNavigator,
  pop,
  openDrawer,
  closeDrawer,
  toggleDrawer,
  setParams,
  getCurrentOptions,
  getCurrentRoute,
  push,
  replace,
  reset,
  resetRoute,
  dispatch,
  popToTop,
  handleAction,
};

export default NavigationService;
