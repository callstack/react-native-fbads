/**
 * NativeAdView.java
 * io.callstack.react.fbads;
 *
 * Created by Mike Grabowski on 25/09/16.
 * Copyright © 2016 Callstack.io. All rights reserved.
 */
package io.callstack.react.fbads;

import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.ads.NativeAd;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.view.ReactViewGroup;

import java.util.ArrayList;
import java.util.List;

public class NativeAdView extends ReactViewGroup {
    /** @{NativeAd} received from the ads manager **/
    private NativeAd mNativeAd;

    /** @{RCTEventEmitter} instance used for sending events back to JS **/
    private RCTEventEmitter mEventEmitter;

    /** @{float} x coordinate where the touch event started **/
    private float startX;

    /** @{float} y coordinate where the touche event started **/
    private float startY;

    /** is clickable (Makes the whole view clickable */
    private Boolean mClickable = false;

    /** List of clickable views */
    List<View> clickableViews = new ArrayList<>();

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
        event.putString("adChoiceIconUrl", nativeAd.getAdChoicesIcon().getUrl());
        event.putString("adChoiceLinkUrl", nativeAd.getAdChoicesLinkUrl());

        // Check as they might be null because of memory issues on low-end devices
        if (coverImage != null) {
            event.putString("coverImage", coverImage.getUrl());
        }

        if (iconImage != null) {
            event.putString("icon", iconImage.getUrl());
        }

        mEventEmitter.receiveEvent(getId(), "onAdLoaded", event);

        setAdClickable(mClickable);
    }

    /**
     * Registers the view for interaction
     */
    public void setAdClickable(Boolean clickable) {
        mClickable = clickable;
        if (clickable && mNativeAd!=null) {
            mNativeAd.registerViewForInteraction(this);
        }
    }

    /**
     * If touch event is a click, simulate native event so that `FBAds` can
     * trigger its listener
     *
     * @param {MotionEvent} ev
     *
     * @return
     */
    @Override
    public boolean onTouchEvent(MotionEvent ev) {
        switch (ev.getActionMasked()) {
            case MotionEvent.ACTION_DOWN:
                startX = ev.getX();
                startY = ev.getY();
                break;
            case MotionEvent.ACTION_UP:
                float deltaX = Math.abs(startX - ev.getX());
                float deltaY = Math.abs(startY - ev.getY());
                if (deltaX < 200 & deltaY < 200) {
                    performClick();
                }
                break;
        }
        return mClickable;
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {
        return mClickable;
    }

    /**
     * Add a view to the clickable list
     */
    public List<View> addClickableView(View clickableView) {
        this.extractClickableChildren(clickableViews, clickableView);
        mNativeAd.registerViewForInteraction(clickableView, clickableViews);
        return clickableViews;
    }

    /**
     * Get all view children recursively to add to clickable list
     */
    private void extractClickableChildren(List<View> list, View clickableView) {
        list.add(clickableView);
        if(clickableView instanceof ViewGroup) {
            ViewGroup var3 = (ViewGroup)clickableView;

            for(int var4 = 0; var4 < var3.getChildCount(); ++var4) {
                this.extractClickableChildren(list, var3.getChildAt(var4));
            }
        }
    }

    /**
     * Get list of clickable views
     */
    public List<View> getClickableViews() {
        return clickableViews;
    }

    /**
     * Get the native ad
     */
    public NativeAd getNativeAd() {
        return mNativeAd;
    }
}
