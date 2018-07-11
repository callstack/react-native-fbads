/**
 * NativeAddView.java
 * io.callstack.react.fbads;
 *
 * Created by Mike Grabowski on 25/09/16.
 * Copyright © 2016 Callstack.io. All rights reserved.
 */
package io.callstack.react.fbads;

import android.support.annotation.Nullable;
import android.view.View;

import com.facebook.ads.NativeAdsManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class NativeAdViewManager extends ViewGroupManager<NativeAdView> {
    ReactApplicationContext mReactContext;
    NativeAdView mView;

    public NativeAdViewManager(ReactApplicationContext reactContext) {
        super();
        mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "CTKNativeAd";
    }

    @Override
    protected NativeAdView createViewInstance(ThemedReactContext reactContext) {
        mView = new NativeAdView(reactContext);
        return mView;
    }

    @ReactProp(name = "adsManager")
    public void setAdsManager(NativeAdView view, String adsManagerId) {
        NativeAdManager adManager = mReactContext.getNativeModule(NativeAdManager.class);
        view.setNativeAd(adManager.getNextNativeAd(adsManagerId));

//        NativeAdsManager adsManager = adManager.getFBAdsManager(adsManagerId);

//        view.setNativeAd(adsManager.nextNativeAd());
    }

    @ReactProp(name = "clickable")
    public void setClickable(NativeAdView view, Boolean clickable) {
        view.setAdClickable(clickable);
    }

    @Override
    @Nullable
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.<String, Object>of(
            "onAdLoaded",
            MapBuilder.of("registrationName", "onAdLoaded"),
            "onAdFailed",
            MapBuilder.of("registrationName", "onAdFailed")
        );
    }

    @Override
    public void addView(NativeAdView parent, View child, int index) {
        parent.addView(child, index);
    }

    @Override
    public int getChildCount(NativeAdView parent) {
        return parent.getChildCount();
    }

    @Override
    public View getChildAt(NativeAdView parent, int index) {
        return parent.getChildAt(index);
    }

    @Override
    public void removeViewAt(NativeAdView parent, int index) {
        parent.removeViewAt(index);
    }
}
