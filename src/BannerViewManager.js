/**
 * BannerViewManager.js
 * react-native-fbads
 *
 * Created by Jakub Stasiak on 15/11/16.
 * Copyright © 2017 Callstack.io. All rights reserved.
 *
 * @flow
 */

import React, { PropTypes } from 'react';
import { requireNativeComponent, StyleSheet, View } from 'react-native';

type AdType = 'large' | 'rectangle' | 'standard';

const CTKBannerView = requireNativeComponent('CTKBannerView', null, {
  onAdPress: true,
  onAdError: true,
});

const sizeForType = {
  large: 90,
  rectangle: 250,
  standard: 50,
};

/**
 * Gets size for a type (any value of `AdType` is allowed)
 */
const getSizeForType = (type: AdType) => sizeForType[type] || sizeForType.standard;

type BannerViewProps = {
  type: AdType,
  placementId: string,
  style: number | StyleSheet.Styles | { [key: string]: string | number },
  onPress: Function,
  onError: Function,
};

const BannerView = (props: BannerViewProps) => {
  const { type, onPress, onError, style, ...restProps } = props;
  const size = getSizeForType(type);

  return (
    <CTKBannerView
      size={size}
      onAdPress={onPress}
      onAdError={onError}
      style={[style, { height: size }]}
      {...restProps}
    />
  );
};

export default BannerView;
