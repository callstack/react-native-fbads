package io.callstack.react.fbads;

import android.os.Handler;
import android.view.Gravity;
import android.view.View;

import com.facebook.ads.MediaView;
import com.facebook.ads.NativeAd;
import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by camlahoud on 9/4/17.
 */

public class MediaViewManager extends SimpleViewManager<MediaView> {
    public final static String NAME = "CTKMediaView";
    private ThemedReactContext mContext;
    private MediaView view = null;
    private LayoutShadowNode shadowNode;

    /**
     * Get Name
     */
    @Override
    public String getName() { return NAME; }

    /**
     * Create View Instance
     *
     */
    @Override
    public MediaView createViewInstance(ThemedReactContext context) {
        mContext = context;
        view = new MediaView(context);
        view.setGravity(Gravity.CENTER);

        return view;
    }

    @Override
    public Class getShadowNodeClass() {
        return LayoutShadowNode.class;
    }

    @Override
    public LayoutShadowNode createShadowNodeInstance() {
        shadowNode = new LayoutShadowNode();
        shadowNode.setFlex(1.0f);
        return shadowNode;
    }

    /**
     * Set the root reference to get the native ad view manager
     */
    @ReactProp(name = "nativeAdView")
    public void setNativeAdView(final MediaView view, final int tag) {
        UIManagerModule uiManager = this.mContext.getNativeModule(UIManagerModule.class);
        uiManager.addUIBlock(new UIBlock() {
            @Override
            public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
                NativeAdView v = (NativeAdView) nativeViewHierarchyManager.resolveView(tag);
                NativeAd ad = v.getNativeAd();
                view.setNativeAd(ad);
                Handler handler = new Handler();
                handler.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        view.measure(
                                View.MeasureSpec.makeMeasureSpec(view.getWidth(), View.MeasureSpec.EXACTLY),
                                View.MeasureSpec.makeMeasureSpec(view.getHeight(), View.MeasureSpec.EXACTLY));
                        view.layout(view.getLeft(), view.getTop(), view.getRight(), view.getBottom());
                    }
                }, 3000);
            }
        });
    }

}