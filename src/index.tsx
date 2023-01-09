import { NativeModules, Platform } from 'react-native';

//declare var global: any;

const LINKING_ERROR =
  `The package 'react-native-console-oslog' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const ConsoleOsLog = NativeModules.ConsoleOslog
  ? NativeModules.ConsoleOslog
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

function _handleLog(type: string, line: string) {
  switch (type) {
    case "debug":
      ConsoleOsLog.log(line);
      break;
    case "log":
      ConsoleOsLog.logInfo(line);
      break;
    case "warning":
      ConsoleOsLog.logInfo(line);
      break;
    case "error":
      ConsoleOsLog.logError(line);
      break;
  }
}

ConsoleOsLog.captureConsole = (capture: boolean = true) => {
  if (!!capture) {
    // Undocumented but working for now.
    global.__inspectorLog = _handleLog;
  } else {
    global.__inspectorLog = undefined;
  }
}

export default ConsoleOsLog;