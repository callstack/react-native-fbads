import { EventSubscription } from 'fbemitter';
import React, { ReactNode } from 'react';
import { findNodeHandle, requireNativeComponent } from 'react-native';
import { AdIconView, MediaView } from '../index';
import {
  AdChoicesViewContext,
  AdIconViewContext,
  AdIconViewContextValueType,
  ComponentOrClass,
  MediaViewContext,
  MediaViewContextValueType,
  TriggerableContext,
  TriggerableContextValueType,
} from './contexts';
import { HasNativeAd, NativeAd } from './nativeAd';
import AdsManager from './NativeAdsManager';
import { areSetsEqual } from '../util/areSetsEqual';

interface NativeAdViewProps {
  adsManager: string;
  onAdLoaded: (args: { nativeEvent: NativeAd }) => void;
}

// tslint:disable-next-line:variable-name
const NativeAdView = requireNativeComponent<NativeAdViewProps>('CTKNativeAd');

interface AdWrapperState {
  ad?: NativeAd;
  canRequestAds: boolean;
  mediaViewNodeHandle: number;
  adIconViewNodeHandle: number;
  clickableChildren: Set<number>;
}

interface AdWrapperProps {
  adsManager: AdsManager;
  onAdLoaded?: (ad: NativeAd) => void;
}

export default <T extends HasNativeAd>(
  // tslint:disable-next-line:variable-name
  Component: React.ComponentType<T>,
) =>
  class NativeAdWrapper extends React.Component<
    AdWrapperProps & T,
    AdWrapperState
  > {
    private subscription?: EventSubscription;
    private subscriptionError?: EventSubscription;
    private nativeAdViewRef?: React.Component;
    private registerFunctionsForTriggerables: TriggerableContextValueType;
    private registerFunctionsForMediaView: MediaViewContextValueType;
    private registerFunctionsForAdIconView: AdIconViewContextValueType;
    private clickableChildrenNodeHandles: Map<ComponentOrClass, number>;

    constructor(props: AdWrapperProps & T) {
      super(props);

      this.registerFunctionsForTriggerables = {
        register: this.registerClickableChild,
        unregister: this.unregisterClickableChild,
      };

      this.registerFunctionsForMediaView = {
        unregister: this.unregisterMediaView,
        register: this.registerMediaView,
      };

      this.registerFunctionsForAdIconView = {
        unregister: this.unregisterAdIconView,
        register: this.registerAdIconView,
      };

      this.clickableChildrenNodeHandles = new Map();

      this.state = {
        // iOS requires a non-null value
        mediaViewNodeHandle: -1,
        adIconViewNodeHandle: -1,
        clickableChildren: new Set(),
        canRequestAds: false,
      };
    }

    /**
     * On init, register for updates on `adsManager` to know when it becomes available
     */
    public componentDidMount() {
      this.subscription = this.props.adsManager.onAdsLoaded(() =>
        this.setState({ canRequestAds: true }),
      );
      this.subscriptionError = this.props.adsManager.onAdsError(() =>
        this.setState({ canRequestAds: false }),
      );
    }

    public componentDidUpdate(_: AdWrapperProps, prevState: AdWrapperState) {
      if (
        this.state.mediaViewNodeHandle === -1 ||
        this.state.adIconViewNodeHandle === -1
      ) {
        // Facebook's SDK requires both MediaView and AdIconView references in order to register
        // interactable views. If one of them is missing, we can't proceed with the registration.
        return;
      }

      const mediaViewNodeHandleChanged =
        this.state.mediaViewNodeHandle !== prevState.mediaViewNodeHandle;
      const adIconViewNodeHandleChanged =
        this.state.adIconViewNodeHandle !== prevState.adIconViewNodeHandle;
      const clickableChildrenChanged = areSetsEqual(
        prevState.clickableChildren,
        this.state.clickableChildren,
      );

      if (
        mediaViewNodeHandleChanged ||
        adIconViewNodeHandleChanged ||
        clickableChildrenChanged
      ) {
        AdsManager.registerViewsForInteractionAsync(
          findNodeHandle(this.nativeAdViewRef!)!,
          this.state.mediaViewNodeHandle,
          this.state.adIconViewNodeHandle,
          [...this.state.clickableChildren],
        );
      }
    }

    /**
     * Clear subscription when component goes off screen
     */
    public componentWillUnmount() {
      if (this.subscription) {
        this.subscription.remove();
      }
      if (this.subscriptionError) {
        this.subscriptionError.remove();
      }
    }

    private registerMediaView = (mediaView: ComponentOrClass) =>
      this.setState({ mediaViewNodeHandle: findNodeHandle(mediaView) || -1 })
    private unregisterMediaView = () =>
      this.setState({ mediaViewNodeHandle: -1 })

    private registerAdIconView = (adIconView: ComponentOrClass) =>
      this.setState({ adIconViewNodeHandle: findNodeHandle(adIconView) || -1 })
    private unregisterAdIconView = () =>
      this.setState({ adIconViewNodeHandle: -1 })

    private registerClickableChild = (child: ComponentOrClass) => {
      const handle = findNodeHandle(child) || -1;
      this.clickableChildrenNodeHandles.set(child, handle);

      this.setState({
        clickableChildren: this.state.clickableChildren.add(handle),
      });
    }

    private unregisterClickableChild = (child: ComponentOrClass) => {
      this.setState(({ clickableChildren }) => {
        const newClickableChildren = new Set(clickableChildren);
        newClickableChildren.delete(
          this.clickableChildrenNodeHandles.get(child)!,
        );
        this.clickableChildrenNodeHandles.delete(child);
        return { clickableChildren: newClickableChildren };
      });
    }

    private handleAdUpdated = () =>
      this.state.ad &&
      this.props.onAdLoaded &&
      this.props.onAdLoaded(this.state.ad)

    private handleAdLoaded = ({ nativeEvent }: { nativeEvent: NativeAd }) => {
      this.setState({ ad: nativeEvent }, this.handleAdUpdated);
    }

    private handleNativeAdViewMount = (ref: React.Component) => {
      this.nativeAdViewRef = ref;
    }

    private renderAdComponent(componentProps: T): ReactNode {
      if (!this.state.ad) {
        return null;
      }
      return (
        <AdIconViewContext.Provider value={this.registerFunctionsForAdIconView}>
          <MediaViewContext.Provider value={this.registerFunctionsForMediaView}>
            <TriggerableContext.Provider
              value={this.registerFunctionsForTriggerables}
            >
              <AdChoicesViewContext.Provider
                value={this.props.adsManager.toJSON()}
              >
                {/* Facebook's registerViewForInteraction requires both AdIconView and MediaView
                  references to be set. We include both as a default */}

                <AdIconView style={{ width: 0, height: 0 }} />
                <MediaView style={{ width: 0, height: 0 }} />
                <Component {...componentProps} nativeAd={this.state.ad} />
              </AdChoicesViewContext.Provider>
            </TriggerableContext.Provider>
          </MediaViewContext.Provider>
        </AdIconViewContext.Provider>
      );
    }

    render() {
      // Cast to any until https://github.com/Microsoft/TypeScript/issues/10727 is resolved
      const { adsManager, onAdLoaded, ...rest } = this.props as any;

      if (!this.state.canRequestAds) {
        return null;
      }

      return (
        <NativeAdView
          ref={this.handleNativeAdViewMount}
          adsManager={adsManager.toJSON()}
          onAdLoaded={this.handleAdLoaded}
        >
          {this.renderAdComponent(rest)}
        </NativeAdView>
      );
    }
  };
