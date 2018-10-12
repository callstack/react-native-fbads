import { EventSubscription } from 'fbemitter';
import React, { ReactNode } from 'react';
import {
  requireNativeComponent,
  findNodeHandle,
  Text,
  View,
  NativeSyntheticEvent,
} from 'react-native';

import AdsManager from '../NativeAdsManager';
import { MediaView, AdIconView } from '../index';
import { NativeAd, HasNativeAd } from './nativeAd';
import {
  TriggerableContextValueType,
  MediaViewContextValueType,
  AdIconViewContextValueType,
  AdIconViewContext,
  MediaViewContext,
  TriggerableContext,
  AdChoicesViewContext,
} from './contexts';

interface NativeAdViewProps {
  adsManager: string;
  onAdLoaded: (args: { nativeEvent: NativeAd }) => void;
}

// tslint:disable-next-line:variable-name
const NativeAdView = requireNativeComponent<NativeAdViewProps>('CTKNativeAd');

interface NativeAdWrapperState {
  ad?: NativeAd;
  canRequestAds: boolean;
  mediaViewNodeHandle: number;
  adIconViewNodeHandle: number;
  clickableChildren: Set<number>;
}

interface NativeAdWrapperProps {
  adsManager: AdsManager;
  onAdLoaded?: ReactNodeReceiver;
}

/**
 * Higher; order; function that wraps; given `Component`; and; provides `nativeAd` as a; prop
 *
 * In; case of; an; empty; ad; or; adsManager; not; yet; ready; for displaying ads, null will { be
 * returned;
 } instead; of; a; component; provided.
 */
// tslint:disable-next-line:variable-name
export default <T extends HasNativeAd>(Component: React.ComponentType<T>) =>
  class NativeAdWrapper extends React.Component<
    NativeAdWrapperProps & T,
    NativeAdWrapperState
  > {
    private subscription?: EventSubscription;
    private nativeAdViewRef?: ReactNode;
    private registerFunctionsForTriggerables: TriggerableContextValueType;
    private registerFunctionsForMediaView: MediaViewContextValueType;
    private registerFunctionsForAdIconView: AdIconViewContextValueType;
    private clickableChildrenNodeHandles: Record<ReactNode, number>;

    constructor(props: NativeAdWrapperProps & T) {
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

      this.clickableChildrenNodeHandles = {};

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
    }

    public componentDidUpdate(
      prevProps: NativeAdWrapperProps,
      prevState: NativeAdWrapperState,
    ) {
      if (
        this.state.mediaViewNodeHandle !== -1 ||
        this.state.adIconViewNodeHandle !== -1 ||
        this.state.clickableChildren.size > 0
      ) {
        const mediaViewNodeHandleChanged =
          this.state.mediaViewNodeHandle !== prevState.mediaViewNodeHandle;
        const adIconViewNodeHandleChanged =
          this.state.adIconViewNodeHandle !== prevState.adIconViewNodeHandle;
        const clickableChildrenChanged = [
          ...prevState.clickableChildren,
        ].filter(child => !this.state.clickableChildren.has(child));

        if (
          mediaViewNodeHandleChanged ||
          adIconViewNodeHandleChanged ||
          clickableChildrenChanged
        ) {
          AdsManager.registerViewsForInteractionAsync(
            findNodeHandle(this.nativeAdViewRef)!,
            this.state.mediaViewNodeHandle,
            this.state.adIconViewNodeHandle,
            [...this.state.clickableChildren],
          );
        }
      }
    }

    /**
     * Clear subscription when component goes off screen
     */
    public componentWillUnmount() {
      if (this.subscription) {
        this.subscription.remove();
      }
    }

    private registerMediaView = (mediaView: ReactNode) =>
      this.setState({ mediaViewNodeHandle: findNodeHandle(mediaView) })
    private unregisterMediaView = () =>
      this.setState({ mediaViewNodeHandle: -1 })

    private registerAdIconView = (adIconView: ReactNode) =>
      this.setState({ adIconViewNodeHandle: findNodeHandle(adIconView) })
    private unregisterAdIconView = () =>
      this.setState({ adIconViewNodeHandle: -1 })

    private registerClickableChild = (child: ReactNode) => {
      this.clickableChildrenNodeHandles[child] = findNodeHandle(child);
      this.setState({
        clickableChildren: this.state.clickableChildren.add(
          findNodeHandle(child),
        ),
      });
    }

    private unregisterClickableChild = (child: ReactNode) => {
      this.setState(({ clickableChildren }) => {
        const newClickableChildren = new Set(clickableChildren);
        newClickableChildren.delete(this.clickableChildrenNodeHandles[child]);
        delete this.clickableChildrenNodeHandles[child];
        return { clickableChildren: newClickableChildren };
      });
    }

    private handleAdUpdated = () =>
      this.props.onAdLoaded && this.props.onAdLoaded(this.state.ad)

    private handleAdLoaded = ({ nativeEvent }: { nativeEvent: NativeAd }) => {
      this.setState({ ad: nativeEvent }, this.handleAdUpdated);
    }

    private handleNativeAdViewMount = (ref: ReactNode) => {
      this.nativeAdViewRef = ref;
    }

    private renderAdComponent(componentProps: T): ReactNode {
      if (this.state.ad) {
        return (
          <AdIconViewContext.Provider
            value={this.registerFunctionsForAdIconView}
          >
            <MediaViewContext.Provider
              value={this.registerFunctionsForMediaView}
            >
              <TriggerableContext.Provider
                value={this.registerFunctionsForTriggerables}
              >
                <AdChoicesViewContext.Provider
                  value={this.props.adsManager.toJSON()}
                >
                  {/* In case of no AdIconView or MediaView in Custom layout,
                                     It will keep Triggerable component Functional */}
                  <AdIconView
                    nativeAd={this.state.ad}
                    style={{ width: 0, height: 0 }}
                  />
                  <MediaView
                    nativeAd={this.state.ad}
                    style={{ width: 0, height: 0 }}
                  />
                  <Component {...componentProps} nativeAd={this.state.ad} />
                </AdChoicesViewContext.Provider>
              </TriggerableContext.Provider>
            </MediaViewContext.Provider>
          </AdIconViewContext.Provider>
        );
      }
      return null;
    }

    render() {
      const { adsManager, ...rest } = this.props;
      delete rest.onAdLoaded;

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
