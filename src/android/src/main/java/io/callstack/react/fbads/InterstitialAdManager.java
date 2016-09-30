package io.callstack.react.fbads;

import com.facebook.ads.AbstractAdListener;
import com.facebook.ads.Ad;
import com.facebook.ads.AdError;
import com.facebook.ads.InterstitialAd;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class InterstitialAdManager extends ReactContextBaseJavaModule {

  public InterstitialAdManager(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @ReactMethod
  public void showAd(String placementId, final Promise promise) {
    ReactApplicationContext reactContext = this.getReactApplicationContext();

    final InterstitialAd interstitial = new InterstitialAd(reactContext, placementId);
    interstitial.setAdListener(new AbstractAdListener() {

      @Override
      public void onAdLoaded(Ad ad) {
        if (ad == interstitial) {
          interstitial.show();
        }
      }

      @Override
      public void onError(Ad ad, AdError error) {
        promise.reject("" + error.getErrorCode(), error.getErrorMessage());
      }

      @Override
      public void onAdClicked(Ad ad) {
          promise.resolve(true);
      }

      @Override
      public void onInterstitialDismissed(Ad ad) {
        promise.resolve(false);
      }
    });
    interstitial.loadAd();
  }

  @Override
  public String getName() {
    return "CTKInterstitialAdManager";
  }
}
