/**
 * withNativeAd.js
 * react-native-fbads
 *
 * Created by Mike Grabowski on 24/09/16.
 * Copyright © 2016 Callstack.io. All rights reserved.
 */

import React from 'react';
import { requireNativeComponent, View } from 'react-native';

const NativeAd = requireNativeComponent('CTKNativeAd', null);

/**
 * Higher order function for injecting Facebook Native Ads into a component,
 * wrap any view with it and use `nativeAd` prop to render custom template.
 *
 * Provide second component to be used as a placeholder when ad is either missing
 * or still loading.
 */
module.exports = (Component, EmptyComponent = View) => class NativeAdWrapper extends React.Component {
  state = {
    ad: null,
  };

  onAdLoaded = (e) => {
    this.setState({ ad: e.nativeEvent });
  };

  render() {
    const children = Boolean(this.state.ad)
      ? <Component nativeAd={this.state.ad} />
      : <EmptyComponent />;

    return (
      <NativeAd onAdLoaded={this.onAdLoaded}>
        {children}
      </NativeAd>
    );
  }
};