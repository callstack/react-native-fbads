/**
 * InterstitialAdManager.js
 * react-native-fbads
 *
 * Created by Mike Grabowski on 29/09/16.
 * Copyright © 2016 Callstack.io. All rights reserved.
 *
 * @flow
 */

import { NativeModules } from 'react-native';

const { CTKInterstitialAdManager } = NativeModules;

export default {
  /**
   * Shows interstitial ad for a given placementId
   */
  showAd(placementId: string): Promise<boolean> {
    return CTKInterstitialAdManager.showAd(placementId);
  },
};
