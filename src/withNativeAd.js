/**
 * withNativeAd.js
 * react-native-fbads
 *
 * Created by Mike Grabowski on 24/09/16.
 * Copyright © 2016 Callstack.io. All rights reserved.
 *
 * @flow
 */

import React from 'react';
import AdsManager from './AdsManager';
import type { NativeAd } from './types';
import {
  requireNativeComponent,
  View,
  NativeModules,
  NativeAppEventEmitter,
} from 'react-native';

const NativeAdLoader = requireNativeComponent('CTKNativeAd', null);

type NativeAdWrapperState = {
  ad: ?NativeAd,
  canRequestAds: boolean,
};

/**
 * Higher order function for injecting Facebook Native Ads into a given Component.
 *
 * Usage:
 * ```js
 * const MyAdComponent = withNativeAd(({ nativeAd}) => (
 *  <Text>{nativeAd.description}</Text>
 * ));
 * ```
 *
 * Second component can be provided to be used as a placeholder for a missing or
 * not yet loaded ad.
 */
export default (Component: Function, EmptyComponent: Function = View) => class NativeAdWrapper extends React.Component {
  state: NativeAdWrapperState = {
    ad: null,
    canRequestAds: false,
  };

  removeSubscription: Function;

  componentDidMount() {
    this.removeSubscription = AdsManager.onAdsLoaded(() => this.setState({ canRequestAds: true }));
  }

  componentWillUnmount() {
    this.removeSubscription();
  }

  onAdLoaded = (e: Object) => {
    this.setState({ ad: e.nativeEvent });
  };

  render() {
    const children = this.state.ad
      ? <Component nativeAd={this.state.ad} />
      : <EmptyComponent />;

    if (!this.state.canRequestAds) {
      return <EmptyComponent />;
    }

    return (
      <NativeAdLoader onAdLoaded={this.onAdLoaded}>
        {children}
      </NativeAdLoader>
    );
  }
};
