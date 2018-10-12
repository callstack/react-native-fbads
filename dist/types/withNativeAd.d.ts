import React, { ReactNode } from 'react';
import AdsManager from './NativeAdsManager';
export interface NativeAd {
    advertiserName: string;
    bodyText: string;
    callToActionText: string;
    headline: string;
    linkDescription: string;
    promotedTranslation: string;
    sponsoredTranslation: string;
    socialContext: string;
    translation: string;
}
interface NativeAdWrapperState {
    ad?: NativeAd;
    canRequestAds: boolean;
    mediaViewNodeHandle: number;
    adIconViewNodeHandle: number;
    clickableChildren: Set<number>;
}
declare type NodeFunc = (n: ReactNode) => void;
interface NativeAdWrapperProps {
    adsManager: AdsManager;
    onAdLoaded?: NodeFunc;
}
interface MultipleRegisterablesContextValueType {
    unregister?: NodeFunc;
    register?: NodeFunc;
}
interface RegisterableContextValueType {
    register?: NodeFunc;
    unregister?: () => void;
}
export declare type TriggerableContextValueType = MultipleRegisterablesContextValueType;
export declare type AdIconViewContextValueType = RegisterableContextValueType;
export declare type MediaViewContextValueType = RegisterableContextValueType;
export declare type AdChoicesViewContextValueType = string;
export declare const TriggerableContext: React.Context<{
    register: null;
    unregister: null;
}>;
export declare const MediaViewContext: React.Context<{
    register: null;
    unregister: null;
}>;
export declare const AdIconViewContext: React.Context<{
    register: null;
    unregister: null;
}>;
export declare const AdChoicesViewContext: any;
declare const _default: <T extends Object>(Component: React.ComponentType<T>) => {
    new (props: NativeAdWrapperProps & T): {
        subscription?: any;
        nativeAdViewRef?: any;
        registerFunctionsForTriggerables: MultipleRegisterablesContextValueType;
        registerFunctionsForMediaView: RegisterableContextValueType;
        registerFunctionsForAdIconView: RegisterableContextValueType;
        clickableChildrenNodeHandles: {};
        /**
         * On init, register for updates on `adsManager` to know when it becomes available
         */
        componentDidMount(): void;
        componentDidUpdate(prevProps: NativeAdWrapperProps, prevState: NativeAdWrapperState): void;
        /**
         * Clear subscription when component goes off screen
         */
        componentWillUnmount(): void;
        registerMediaView: (mediaView: any) => any;
        unregisterMediaView: () => void;
        registerAdIconView: (adIconView: any) => any;
        unregisterAdIconView: () => void;
        registerClickableChild: (child: React.ReactNode) => void;
        unregisterClickableChild: (child: React.ReactNode) => void;
        handleAdUpdated: () => void;
        handleAdLoaded: ({ nativeEvent }: {
            nativeEvent: NativeAd;
        }) => void;
        handleNativeAdViewMount: (ref?: any) => void;
        renderAdComponent(componentProps: T): React.ReactNode;
        render(): JSX.Element | null;
        setState<K extends "ad" | "canRequestAds" | "mediaViewNodeHandle" | "adIconViewNodeHandle" | "clickableChildren">(state: NativeAdWrapperState | ((prevState: Readonly<NativeAdWrapperState>, props: Readonly<NativeAdWrapperProps & T>) => NativeAdWrapperState | Pick<NativeAdWrapperState, K> | null) | Pick<NativeAdWrapperState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<NativeAdWrapperProps & T>;
        state: Readonly<NativeAdWrapperState>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
};
/**
 * Higher; order; function that wraps; given `Component`; and; provides `nativeAd` as a; prop
 *
 * In; case of; an; empty; ad; or; adsManager; not; yet; ready; for displaying ads, null will { be
 * returned;
 } instead; of; a; component; provided.
 */
export default _default;
