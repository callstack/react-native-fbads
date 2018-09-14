/**
 * NativeAdChoicesView.java
 * suraj.tiwari.reactnativefbads
 *
 * Created by Suraj Tiwari on 07/08/18.
 * Copyright © 2018 Suraj Tiwari All rights reserved.
 */
package suraj.tiwari.reactnativefbads;

import com.facebook.ads.NativeAd;
import com.facebook.ads.AdChoicesView;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.views.view.ReactViewGroup;

public class NativeAdChoicesView extends ReactViewGroup {

  private ReactContext mContext;
   public NativeAdChoicesView(ThemedReactContext context) {
    super(context);
    mContext = context;
  }

  public void setNativeAd(NativeAd nativeAd) {
    AdChoicesView adChoicesView = new AdChoicesView(mContext, nativeAd, true);
    adChoicesView.measure(40, 40);
    adChoicesView.layout(0, 0, 40, 40);
    adChoicesView.bringToFront();
    addView(adChoicesView);
  }
}