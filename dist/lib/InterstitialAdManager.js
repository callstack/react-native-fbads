import { NativeModules } from 'react-native';
const { CTKInterstitialAdManager } = NativeModules;
export default {
    /**
     * Shows interstitial ad for a given placementId
     */
    showAd(placementId) {
        return CTKInterstitialAdManager.showAd(placementId);
    },
};
