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

let pendingPromise: ?Promise<boolean> = null;
export default {
  /**
   * Shows interstitial ad for a given placementId
   */
  showAd(placementId: string): Promise<boolean> {
    if (pendingPromise === null) {
      pendingPromise = CTKInterstitialAdManager.showAd(placementId);
      pendingPromise
        .then(() => pendingPromise = null)
        .catch(() => pendingPromise = null);
    }

    return pendingPromise;
  },
};
