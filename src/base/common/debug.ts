export function debug(msg, data?) {
  if (__DEV__) {
    console.log(msg, data);
  }
}
