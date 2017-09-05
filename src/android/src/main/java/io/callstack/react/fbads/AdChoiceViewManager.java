package io.callstack.react.fbads;

import android.content.Context;
import android.view.Gravity;
import android.view.View;
import android.widget.RelativeLayout;

import com.facebook.ads.*;
import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.yoga.YogaMeasureFunction;
import com.facebook.yoga.YogaMeasureMode;
import com.facebook.yoga.YogaMeasureOutput;
import com.facebook.yoga.YogaNode;

/**
 * Created by camlahoud on 8/30/17.
 */

public class AdChoiceViewManager extends SimpleViewManager<RelativeLayout> {
    public final static String NAME = "CTKAdChoice";
    private ThemedReactContext mContext;
    private RelativeLayout mRootView = null;
    private AdChoiceShadowNode shadowNode;

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
    public RelativeLayout createViewInstance(ThemedReactContext context) {
        mContext = context;
        mRootView = new RelativeLayout(context);
        mRootView.setGravity(Gravity.RIGHT);
        return mRootView;
    }

    @Override
    public Class getShadowNodeClass() {
        return AdChoiceShadowNode.class;
    }

    @Override
    public LayoutShadowNode createShadowNodeInstance() {
        shadowNode = new AdChoiceShadowNode();
        return shadowNode;
    }

    /**
     * Set the root reference to get the native ad view manager
     */
    @ReactProp(name = "nativeAdView")
    public void setNativeAdView(final RelativeLayout view, final int tag) {
        UIManagerModule uiManager = this.mContext.getNativeModule(UIManagerModule.class);
        uiManager.addUIBlock(new UIBlock() {
            @Override
            public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
                NativeAdView v = (NativeAdView)nativeViewHierarchyManager.resolveView(tag);
                NativeAd ad = v.getNativeAd();
                final AdChoiceView adChoicesView = new AdChoiceView(mContext, ad, true);
                mRootView.addView(adChoicesView);
            }
        });
    }

    public class AdChoiceShadowNode extends LayoutShadowNode implements YogaMeasureFunction {
        protected int mWidth = 0;

        public AdChoiceShadowNode() {
            this.setMeasureFunction(this);
        }

        public void forceWidth (int width) {
            mWidth = width;
            dirty();
        }

        @Override
        public long measure(
                YogaNode node,
                float width, YogaMeasureMode widthMode,
                float height, YogaMeasureMode heightMode) {
            if (mWidth > 0) {
                return YogaMeasureOutput.make(mWidth, 50);
            }
            return YogaMeasureOutput.make(200, 50);
        }

        @ReactProp(name = "adsManager")
        public void setAdsManager(String adsManagerId) {
            dirty();
        }
    }

    public class AdChoiceView extends AdChoicesView {

        private RelativeLayout parentView = null;
        private AdChoiceShadowNode mShadowNode;

        public AdChoiceView(Context var1, NativeAd var2) {
            this(var1, var2, false);
        }

        public AdChoiceView(Context var1, final NativeAd var2, boolean var3) {
            super(var1, var2, var3);
        }

        @Override
        public void requestLayout() {
            super.requestLayout();
//            mShadowNode = AdChoiceViewManager.this.shadowNode;
            if (this.getParent()!=null) {
                parentView = (RelativeLayout) this.getParent();
            }
            post(measureAndLayout);
        }

        private final Runnable measureAndLayout = new Runnable() {
            @Override
            public void run() {
                if (parentView!=null) {
                    parentView.measure(
                            View.MeasureSpec.makeMeasureSpec(parentView.getWidth(), View.MeasureSpec.EXACTLY),
                            View.MeasureSpec.makeMeasureSpec(parentView.getHeight(), View.MeasureSpec.EXACTLY));
                    parentView.layout(parentView.getLeft(), parentView.getTop(), parentView.getRight(), parentView.getBottom());
                }
            }
        };
    }

}