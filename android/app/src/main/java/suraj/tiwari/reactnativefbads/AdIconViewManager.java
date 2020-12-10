package suraj.tiwari.reactnativefbads;

import com.facebook.ads.MediaView;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class AdIconViewManager extends SimpleViewManager<MediaView> {
  private static final String REACT_CLASS = "AdIconView";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  protected MediaView createViewInstance(ThemedReactContext reactContext) {
    return new MediaView(reactContext);
  }
}
