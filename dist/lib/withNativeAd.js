var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React from 'react';
import { requireNativeComponent, findNodeHandle, } from 'react-native';
import AdsManager from './NativeAdsManager';
import { MediaView, AdIconView } from './index';
// tslint:disable-next-line:variable-name
const NativeAdView = requireNativeComponent('CTKNativeAd', null);
const defaultValue = { register: null, unregister: null };
// tslint:disable-next-line:variable-name
export const TriggerableContext = React.createContext(defaultValue);
// tslint:disable-next-line:variable-name
export const MediaViewContext = React.createContext(defaultValue);
// tslint:disable-next-line:variable-name
export const AdIconViewContext = React.createContext(defaultValue);
// tslint:disable-next-line:variable-name
export const AdChoicesViewContext = React.createContext();
/**
 * Higher; order; function that wraps; given `Component`; and; provides `nativeAd` as a; prop
 *
 * In; case of; an; empty; ad; or; adsManager; not; yet; ready; for displaying ads, null will { be
 * returned;
 } instead; of; a; component; provided.
 */
// tslint:disable-next-line:variable-name
export default (Component) => class NativeAdWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.registerMediaView = (mediaView) => this.setState({ mediaViewNodeHandle: findNodeHandle(mediaView) });
        this.unregisterMediaView = () => this.setState({ mediaViewNodeHandle: -1 });
        this.registerAdIconView = (adIconView) => this.setState({ adIconViewNodeHandle: findNodeHandle(adIconView) });
        this.unregisterAdIconView = () => this.setState({ adIconViewNodeHandle: -1 });
        this.registerClickableChild = (child) => {
            this.clickableChildrenNodeHandles[child] = findNodeHandle(child);
            this.setState({
                clickableChildren: this.state.clickableChildren.add(findNodeHandle(child)),
            });
        };
        this.unregisterClickableChild = (child) => {
            this.setState(({ clickableChildren }) => {
                const newClickableChildren = new Set(clickableChildren);
                newClickableChildren.delete(this.clickableChildrenNodeHandles[child]);
                delete this.clickableChildrenNodeHandles[child];
                return { clickableChildren: newClickableChildren };
            });
        };
        this.handleAdUpdated = () => this.props.onAdLoaded && this.props.onAdLoaded(this.state.ad);
        this.handleAdLoaded = ({ nativeEvent }) => {
            this.setState({ ad: nativeEvent }, this.handleAdUpdated);
        };
        this.handleNativeAdViewMount = (ref) => {
            this.nativeAdViewRef = ref;
        };
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
            ad: null,
            // iOS requires a nonnull value
            mediaViewNodeHandle: -1,
            adIconViewNodeHandle: -1,
            clickableChildren: new Set(),
            canRequestAds: false,
        };
    }
    /**
     * On init, register for updates on `adsManager` to know when it becomes available
     */
    componentDidMount() {
        this.subscription = this.props.adsManager.onAdsLoaded(() => this.setState({ canRequestAds: true }));
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.mediaViewNodeHandle !== -1 ||
            this.state.adIconViewNodeHandle !== -1 ||
            this.state.clickableChildren.size > 0) {
            const mediaViewNodeHandleChanged = this.state.mediaViewNodeHandle !== prevState.mediaViewNodeHandle;
            const adIconViewNodeHandleChanged = this.state.adIconViewNodeHandle !== prevState.adIconViewNodeHandle;
            const clickableChildrenChanged = [
                ...prevState.clickableChildren,
            ].filter(child => !this.state.clickableChildren.has(child));
            if (mediaViewNodeHandleChanged ||
                adIconViewNodeHandleChanged ||
                clickableChildrenChanged) {
                AdsManager.registerViewsForInteractionAsync(findNodeHandle(this._nativeAdViewRef), this.state.mediaViewNodeHandle, this.state.adIconViewNodeHandle, [...this.state.clickableChildren]);
            }
        }
    }
    /**
     * Clear subscription when component goes off screen
     */
    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.remove();
        }
    }
    renderAdComponent(componentProps) {
        const { adsManager } = this.props;
        if (this.state.ad) {
            return (<AdIconViewContext.Provider value={this.registerFunctionsForAdIconView}>
            <MediaViewContext.Provider value={this.registerFunctionsForMediaView}>
              <TriggerableContext.Provider value={this.registerFunctionsForTriggerables} y="hello">
                <AdChoicesViewContext.Provider value={this.props.adsManager.toJSON()}>
                  
                  <AdIconView nativeAd={this.state.ad} style={{ width: 0, height: 0 }}/>
                  <MediaView nativeAd={this.state.ad} style={{ width: 0, height: 0 }}/>
                  <Component {...componentProps} nativeAd={this.state.ad}/>
                </AdChoicesViewContext.Provider>
              </TriggerableContext.Provider>
            </MediaViewContext.Provider>
          </AdIconViewContext.Provider>);
        }
        return null;
    }
    render() {
        const _a = this.props, { adsManager } = _a, props = __rest(_a, ["adsManager"]);
        delete props.onAdLoaded;
        if (!this.state.canRequestAds) {
            return null;
        }
        return (<NativeAdView ref={this.handleNativeAdViewMount} adsManager={adsManager.toJSON()} onAdLoaded={this._handleAdLoaded}>
          {this.renderAdComponent(props)}
        </NativeAdView>);
    }
};
