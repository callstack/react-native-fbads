package io.callstack.react.fbads;


import com.facebook.ads.AdSize;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

public class BannerViewManager extends SimpleViewManager<BannerView> {

  public BannerViewManager(ReactContext context) {
    super();
  }

  @ReactProp(name="placementId")
  public void setPlacementId(BannerView view, String placementId) {
    view.setPlacementId(placementId);
  }

  @ReactProp(name="size")
  public void setSize(BannerView view, ReadableMap size) {
//    this.
    view.setSize(AdSize.fromWidthAndHeight(size.getInt("width"), size.getInt("height")));
  }

  @Override
  protected BannerView createViewInstance(ThemedReactContext reactContext) {
    return new BannerView(reactContext);
  }

  @Override
  public String getName() {
    return "CTKBannerView";
  }
}
