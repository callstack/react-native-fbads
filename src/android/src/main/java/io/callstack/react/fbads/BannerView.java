package io.callstack.react.fbads;

import android.content.res.Resources;
import android.util.DisplayMetrics;
import android.util.Log;
import android.util.TypedValue;

import com.facebook.ads.Ad;
import com.facebook.ads.AdError;
import com.facebook.ads.AdListener;
import com.facebook.ads.AdSize;
import com.facebook.ads.AdView;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.views.view.ReactViewGroup;


public class BannerView extends ReactViewGroup implements AdListener {

  public static final String TAG = "BannerView";
  public BannerView(ThemedReactContext c) {
    super(c);
    context = c;
  }

  public void setPlacementId(String p) {
    placementId = p;
    createAdViewIfCan();
  }

  public void setSize(AdSize s) {
    size = s;
    createAdViewIfCan();
  }

  @Override
  public void onError(Ad ad, AdError adError) {
    Log.e(TAG, adError.getErrorMessage());
    adView.destroy();
  }

  @Override
  public void onAdLoaded(Ad ad) {
    Log.d(TAG, "Banner ad loaded");
    this.removeAllViews();

    Resources r = context.getResources();
    DisplayMetrics dm = r.getDisplayMetrics();
    int pxW = size.getWidth() > 0 ?
      dp2px(size.getWidth(), dm)
      : r.getDisplayMetrics().widthPixels;
    int pxH = dp2px(size.getHeight(), dm);

    adView.measure(pxW, pxH);
    adView.layout(0, 0, pxW, pxH);
    this.addView(adView);
  }

  @Override
  public void onAdClicked(Ad ad) {
    Log.d(TAG, "Banner ad clicked");
  }

  private ReactContext context;
  private AdView adView;
  private String placementId;
  private AdSize size;

  private void createAdViewIfCan() {
    if (adView == null && placementId != null && size != null) {
      adView = new AdView(this.getContext(), placementId, size);
      adView.setAdListener(this);

      adView.loadAd();
    }
  }

  private int dp2px(int dp, DisplayMetrics dm) {
    return Math.round(TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp, dm));
  }
}
