package io.callstack.react.fbads;

import com.facebook.ads.AbstractAdListener;
import com.facebook.ads.Ad;
import com.facebook.ads.AdError;
import com.facebook.ads.AdListener;
import com.facebook.ads.InterstitialAd;
import com.facebook.ads.InterstitialAdListener;
import com.facebook.react.bridge.AssertionException;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class InterstitialAdManager extends ReactContextBaseJavaModule implements InterstitialAdListener {

  public InterstitialAdManager(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @ReactMethod
  public void showAd(String placementId, Promise p) {
    if(promise != null) {
      return;
    }

    ReactApplicationContext reactContext = this.getReactApplicationContext();

    promise = p;
    interstitial = new InterstitialAd(reactContext, placementId);
    interstitial.setAdListener(this);
    interstitial.loadAd();
  }

  @Override
  public String getName() {
    return "CTKInterstitialAdManager";
  }

  @Override
  public void onError(Ad ad, AdError adError) {
    promise.reject("" + adError.getErrorCode(), adError.getErrorMessage());
  }

  @Override
  public void onAdLoaded(Ad ad) {
    if (ad == interstitial) {
      interstitial.show();
    }
  }

  @Override
  public void onAdClicked(Ad ad) {
    resolveAndCleanUp(true);
  }

  @Override
  public void onInterstitialDismissed(Ad ad) {
    resolveAndCleanUp(false);
  }

  @Override
  public void onInterstitialDisplayed(Ad ad) {

  }

  private void resolveAndCleanUp(boolean result) {
    if(promise != null) {
      promise.resolve(result);
    }

    promise = null;
  }

  private Promise promise;
  private InterstitialAd interstitial;
}
