package io.callstack.react.fbads;

import android.view.MotionEvent;
import android.view.View;

import com.facebook.ads.NativeAd;
import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewGroup;

import java.util.List;

/**
 * Created by camlahoud on 9/4/17.
 */

public class NativeAdClickableViewManager extends ViewGroupManager<ReactViewGroup> {
    public final static String NAME = "CTKNativeAdClickable";
    public final static String LOGTAG = "ReactNative";
    private ThemedReactContext mContext;
    private ReactViewGroup view = null;
    private ReactViewGroup clickableView = null;
    private LayoutShadowNode shadowNode;

    /** The NativeAdView containing this clickable */
    private NativeAdView mRootView;

    /** NativeAd displayed */
    private NativeAd mNativeAd;

    /** @{float} x coordinate where the touch event started **/
    private float startX;

    /** @{float} y coordinate where the touche event started **/
    private float startY;

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
    public ReactViewGroup createViewInstance(ThemedReactContext context) {
        mContext = context;
        view = new ReactViewGroup(context);
        view.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent ev) {
                switch (ev.getActionMasked()) {
                    case MotionEvent.ACTION_DOWN:
                        startX = ev.getX();
                        startY = ev.getY();
                        break;
                    case MotionEvent.ACTION_UP:
                        float deltaX = Math.abs(startX - ev.getX());
                        float deltaY = Math.abs(startY - ev.getY());
                        if (deltaX < 200 & deltaY < 200) {
                            v.performClick();
                        }
                        break;
                }
                return true;
            }
        });
        return view;
    }

    /**
     * Set the root reference to get the native ad view manager
     */
    @ReactProp(name = "nativeAdView")
    public void setNativeAdView(final ReactViewGroup view, final int tag) {
        try {
            UIManagerModule uiManager = this.mContext.getNativeModule(UIManagerModule.class);
            uiManager.addUIBlock(new UIBlock() {
                @Override
                public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
                    mRootView = (NativeAdView) nativeViewHierarchyManager.resolveView(tag);
                    mRootView.addClickableView(view);
                }
            });
        } catch (Exception e) {
            Log.e(LOGTAG, e.getMessage());
        }
    }
}