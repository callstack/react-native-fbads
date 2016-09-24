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
import {
  requireNativeComponent,
  View,
  NativeModules,
  NativeAppEventEmitter,
} from 'react-native';

const NativeAd = requireNativeComponent('CTKNativeAd', null);

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
export default (Component, EmptyComponent = View) => class NativeAdWrapper extends React.Component {
  state = {
    ad: null,
    adsLoaded: AdsManager.isValid,
  };

  componentDidMount() {
    if (this.state.adsLoaded) {
      return;
    }

    this.subscription = AdsManager.onAdsLoaded(() => this.setState({ adsLoaded: true }));
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  onAdLoaded = (e) => {
    this.setState({ ad: e.nativeEvent });
  };

  render() {
    const children = this.state.ad
      ? <Component nativeAd={this.state.ad} />
      : <EmptyComponent />;

    if (!this.state.adsLoaded) {
      return <EmptyComponent />;
    }

    return (
      <NativeAd onAdLoaded={this.onAdLoaded}>
        {children}
      </NativeAd>
    );
  }
};
