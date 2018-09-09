/**
 * NativeAdChoiceViewManager.java
 * suraj.tiwari.reactnativefbads
 *
 * Created by Suraj Tiwari on 07/08/18.
 * Copyright © 2018 Suraj Tiwari All rights reserved.
 */

package suraj.tiwari.reactnativefbads;

import com.facebook.ads.NativeAdsManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class NativeAdChoicesViewManager extends SimpleViewManager<NativeAdChoicesView> {
  ReactApplicationContext mReactContext;

  private static final String REACT_CLASS = "AdChoicesView";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  public NativeAdChoicesViewManager(ReactApplicationContext context) {
    super();
    mReactContext = context;
  }

  @ReactProp(name = "placementId")
  public void adsManager(NativeAdChoicesView view, String adsManagerId) {
    NativeAdManager adManager = mReactContext.getNativeModule(NativeAdManager.class);
    NativeAdsManager adsManager = adManager.getFBAdsManager(adsManagerId);

    view.setNativeAd(adsManager.nextNativeAd());
  }

  @Override
  protected NativeAdChoicesView createViewInstance(ThemedReactContext reactContext) {
    return new NativeAdChoicesView(reactContext);
  }
}