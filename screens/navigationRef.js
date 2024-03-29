import { createNavigationContainerRef } from '@react-navigation/native';

export const setNavigator = createNavigationContainerRef();

export function navigate(name, params) {
  setNavigator.current.getRootState();
  if (setNavigator.isReady()) {
    setNavigator.navigate(name, params);
  } else {
    // eslint-disable-next-line no-console
    console.log('navigation error');
  }
}
