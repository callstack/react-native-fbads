/**
 * AdSettings.js
 * react-native-fbads
 *
 * Created by Mike Grabowski on 29/09/16.
 * Copyright © 2016 Callstack.io. All rights reserved.
 *
 * @flow
 */

import { NativeModules } from 'react-native';

const { CTKAdSettingsManager } = NativeModules;

export default {
  /**
   * Registers given device with `deviceHash` to receive test Facebook ads.
   */
  addTestDevice(deviceHash: string) {
    CTKAdSettingsManager.addTestDevice(deviceHash);
  },
};
