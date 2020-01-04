package suraj.tiwari.reactnativefbads;

import com.facebook.ads.Ad;
import com.facebook.ads.AdError;
import com.facebook.ads.InterstitialAd;
import com.facebook.ads.InterstitialAdListener;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class InterstitialAdManager extends ReactContextBaseJavaModule implements InterstitialAdListener, LifecycleEventListener {

  private Promise mPromise;
  private boolean mDidClick = false;
  private boolean mDidLoad = false;
  private boolean mViewAtOnce = false;
    
  private InterstitialAd mInterstitial;

  public InterstitialAdManager(ReactApplicationContext reactContext) {
    super(reactContext);
    reactContext.addLifecycleEventListener(this);
  }

  @ReactMethod
  public void showAd(String placementId, Promise p) {
    if (mPromise != null) {
      p.reject("E_FAILED_TO_SHOW", "Only one `showAd` can be called at once");
      return;
    }
    ReactApplicationContext reactContext = this.getReactApplicationContext();

    mViewAtOnce = true;
    mPromise = p;
    mInterstitial = new InterstitialAd(reactContext, placementId);
    mInterstitial.setAdListener(this);
    mInterstitial.loadAd();
  }

  @ReactMethod
  public void preloadAd(String placementId, Promise p) {
    if (mPromise != null) {
      p.reject("E_FAILED_TO_SHOW", "Only one `preloadAd` can be called at once");
      return;
    }
    ReactApplicationContext reactContext = this.getReactApplicationContext();

    mViewAtOnce = false;
    mPromise = p;
    mInterstitial = new InterstitialAd(reactContext, placementId);
    mInterstitial.setAdListener(this);
    mInterstitial.loadAd();
  }

  @ReactMethod
  public void showPreloadedAd(String placementId, Promise p) {
    if (mDidLoad) {
      mInterstitial.show();
    } else {
      mViewAtOnce = true;
    }
  }

  @Override
  public String getName() {
    return "CTKInterstitialAdManager";
  }

  @Override
  public void onError(Ad ad, AdError adError) {
    mPromise.reject("E_FAILED_TO_LOAD", adError.getErrorMessage());
    cleanUp();
  }

  @Override
  public void onAdLoaded(Ad ad) {
    if (ad == mInterstitial && mViewAtOnce) {
      mInterstitial.show();
    } else {
      mDidLoad = true;
    }
  }

  @Override
  public void onAdClicked(Ad ad) {
    mDidClick = true;
  }

  @Override
  public void onInterstitialDismissed(Ad ad) {
    mPromise.resolve(mDidClick);
    cleanUp();
  }

  @Override
  public void onInterstitialDisplayed(Ad ad) {

  }

  @Override
  public void onLoggingImpression(Ad ad) {
  }

  private void cleanUp() {
    mPromise = null;
    mDidClick = false;
    mDidLoad = false;
    mViewAtOnce = false;

    if (mInterstitial != null) {
      mInterstitial.destroy();
      mInterstitial = null;
    }
  }

  @Override
  public void onHostResume() {

  }

  @Override
  public void onHostPause() {

  }

  @Override
  public void onHostDestroy() {
    cleanUp();
  }
}
