import { NativeModules } from 'react-native';

const { CTKInterstitialAdManager } = NativeModules;

export default {
  /**
   * Load interstitial ad for a given placementId and shows it
   */
  showAd(placementId: string): Promise<boolean> {
    return CTKInterstitialAdManager.showAd(placementId);
  },

  /**
   * Preloads an interstitial ad for a given placementId
   */
  preloadAd(placementId: string): Promise<boolean> {
    return CTKInterstitialAdManager.preloadAd(placementId);
  },

  /**
   * Shows an already preloaded Ad
   */
  showPreloadedAd(placementId: string): Promise<boolean> {
    return CTKInterstitialAdManager.showPreloadedAd(placementId);
  }
};
