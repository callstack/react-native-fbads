import { NativeModules } from 'react-native';

const { CTKInterstitialAdManager } = NativeModules;

export default {
  /**
   * Load interstitial ad for a given placementId and shows it
   */
    loadAd(placementId: string): Promise<boolean> {
      return CTKInterstitialAdManager.loadAd(placementId);
    },
    showAd() {
      return CTKInterstitialAdManager.showAd();
    },
};
