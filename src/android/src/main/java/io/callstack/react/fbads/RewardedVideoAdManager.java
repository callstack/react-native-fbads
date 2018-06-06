package io.callstack.react.fbads;

import com.facebook.ads.Ad;
import com.facebook.ads.AdError;
import com.facebook.ads.RewardedVideoAd;
import com.facebook.ads.RewardedVideoAdListener;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.util.Log;

public class RewardedVideoAdManager extends ReactContextBaseJavaModule implements LifecycleEventListener {

    private Promise mLoadedPromise = null;
    private Promise mShowPromise = null;

    private String TAG = "RewardedVideo";

    private RewardedVideoAd mRewardedVideoAd;
  

    public RewardedVideoAdManager(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addLifecycleEventListener(this);
    }

    @ReactMethod
    public void showAd(Promise p) {
        if (mShowPromise != null) {
            p.reject("E_FAILED_TO_SHOW", "Only one `showAd` can be called at once");
            return;
        }
        if (mRewardedVideoAd != null && mRewardedVideoAd.isAdLoaded()) {
            mRewardedVideoAd.show();
            mShowPromise = p;
        }
    }

    @ReactMethod
    public void loadAd(String placementId, Promise p) {
        if (mLoadedPromise != null) {
            p.reject("E_FAILED_TO_SHOW", "Only one `loadAd` can be called at once");
            return;
        }

        ReactApplicationContext reactContext = this.getReactApplicationContext();

        if(mRewardedVideoAd != null)
            mRewardedVideoAd.destroy();
        mRewardedVideoAd = new RewardedVideoAd(reactContext, placementId);

        mLoadedPromise = p;

        mRewardedVideoAd.setAdListener(new RewardedVideoAdListener() {
            @Override
            public void onError(Ad ad, AdError error) {
                // Rewarded video ad failed to load
                Log.e(TAG, "Rewarded video ad failed to load: " + error.getErrorMessage());
                mLoadedPromise.reject("E_FAILED_TO_SHOW", 
                        "Rewarded video ad failed to load: " + error.getErrorMessage());
                cleanUp();
            }

            @Override
            public void onAdLoaded(Ad ad) {
                // Rewarded video ad is loaded and ready to be displayed  
                Log.d(TAG, "Rewarded video ad is loaded and ready to be displayed!");
                mLoadedPromise.resolve(true);
            }

            @Override
            public void onAdClicked(Ad ad) {
                // Rewarded video ad clicked
                Log.d(TAG, "Rewarded video ad clicked!");
            }

            @Override
            public void onLoggingImpression(Ad ad) {
                // Rewarded Video ad impression - the event will fire when the 
                // video starts playing
                Log.d(TAG, "Rewarded video ad impression logged!");
            }

            @Override
            public void onRewardedVideoCompleted() {
                // Rewarded Video View Complete - the video has been played to the end.
                // You can use this event to initialize your reward
                Log.d(TAG, "Rewarded video completed!");
                mShowPromise.resolve(true);
                cleanUp();
            }

            @Override
            public void onRewardedVideoClosed() {
                // The Rewarded Video ad was closed - this can occur during the video
                // by closing the app, or closing the end card.
                Log.d(TAG, "Rewarded video ad closed!");
            }
        });

        mRewardedVideoAd.loadAd();
    }

    @Override
    public String getName() {
        return "CTKRewardedVideoAdManager";
    }

    private void cleanUp() {
        mLoadedPromise = null;
        mShowPromise = null;
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
    if (mRewardedVideoAd != null) {
        mRewardedVideoAd.destroy();
        mRewardedVideoAd = null;
    }
  }
}
