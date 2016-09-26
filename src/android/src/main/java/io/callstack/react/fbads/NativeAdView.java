/**
 * NativeAdView.java
 * io.callstack.react.fbads;
 *
 * Created by Mike Grabowski on 25/09/16.
 * Copyright © 2016 Callstack.io. All rights reserved.
 */
package io.callstack.react.fbads;

import android.view.View;

import com.facebook.ads.NativeAd;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.view.ReactViewGroup;

public class NativeAdView extends ReactViewGroup {
    /** @{NativeAd} received from the ads manager **/
    private NativeAd mNativeAd;

    /** @{RCTEventEmitter} instance used for sending events back to JS **/
    private RCTEventEmitter mEventEmitter;

    /**
     * Creates new NativeAdView instance and retrieves event emitter
     *
     * @param context
     */
    public NativeAdView(ThemedReactContext context) {
        super(context);

        mEventEmitter = context.getJSModule(RCTEventEmitter.class);
    }

    /**
     * Called by the view manager when adsManager prop is set. Sends serialised
     * version of a native ad back to Javascript.
     *
     * Automatically registers current view for interactions on an ad so that
     * it becomes clickable.
     *
     * @param nativeAd
     */
    public void setNativeAd(NativeAd nativeAd) {
        mNativeAd = nativeAd;

        if (nativeAd == null) {
            mEventEmitter.receiveEvent(getId(), "onAdLoaded", null);
            return;
        }

        NativeAd.Image coverImage = nativeAd.getAdCoverImage();
        NativeAd.Image iconImage = nativeAd.getAdIcon();

        WritableMap event = Arguments.createMap();
        event.putString("title", nativeAd.getAdTitle());
        event.putString("subtitle", nativeAd.getAdSubtitle());
        event.putString("description", nativeAd.getAdBody());
        event.putString("callToActionText", nativeAd.getAdCallToAction());

        // Check as they might be null because of memory issues on low-end devices
        if (coverImage != null) {
            event.putString("coverImage", coverImage.getUrl());
        }

        if (iconImage != null) {
            event.putString("icon", iconImage.getUrl());
        }

        mEventEmitter.receiveEvent(getId(), "onAdLoaded", event);

        mNativeAd.registerViewForInteraction(this);
    }
}