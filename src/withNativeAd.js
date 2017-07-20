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
import { requireNativeComponent } from 'react-native';
import AdsManager from './NativeAdsManager';
import type { NativeAd } from './types';

const NativeAdView = requireNativeComponent('CTKNativeAd', null);

type NativeAdWrapperState = {
  ad: ?NativeAd,
  canRequestAds: boolean,
};

type NativeAdWrapperProps = {
  adsManager: AdsManager,
  onError?: () => void,
};

type NativeAdWrapperDefaultProps = {
  onError: () => void,
};

/**
 * Higher order function that wraps given `Component` and provides `nativeAd` as a prop
 *
 * In case of an empty ad or adsManager not yet ready for displaying ads, null will be
 * returned instead of a component provided.
 */
export default (Component: Function) => class NativeAdWrapper extends React.Component {
  state: NativeAdWrapperState = {
    ad: null,
    canRequestAds: false,
  };

  static defaultProps: NativeAdWrapperDefaultProps = {
    onError: () => {},
  };

  props: NativeAdWrapperProps;

  /** @{Function} to call for removing adsManager subscriptions **/
  removeSubscription: Function;

  /**
   * On init, register for updates on `adsManager` to know when it becomes
   * available for accessing
   */
  componentDidMount() {
    this.removeSubscription = this.props.adsManager.onAdsLoaded(
      () => this.setState({ canRequestAds: true })
    );
  }

  /**
   * Clear subscription when component goes off screen
   */
  componentWillUnmount() {
    this.removeSubscription();
  }

  render() {
    const { adsManager, onError, ...props } = this.props;

    if (!this.state.canRequestAds) {
      return null;
    }

    return (
      <NativeAdView
        adsManager={adsManager.toJSON()}
        onAdLoaded={(e) => this.setState({ ad: e.nativeEvent })}
        onAdError={onError}
      >
        {this.state.ad && <Component nativeAd={this.state.ad} {...props} />}
      </NativeAdView>
    );
  }
};
