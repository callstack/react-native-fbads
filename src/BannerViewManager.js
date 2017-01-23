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
import { requireNativeComponent, View } from 'react-native';

type AdType = 'large' | 'rectangle' | 'standard';

const BANNER_HEIGHT_50 = { width: -1, height: 50 };
const BANNER_HEIGHT_90 = { width: -1, height: 90 };
const RECTANGLE_HEIGHT_250 = { width: -1, height: 250 };

const CTKBannerView = requireNativeComponent('CTKBannerView', null, {
  onPress: true,
  onError: true,
});

const sizeForType = {
  large: BANNER_HEIGHT_90,
  rectangle: RECTANGLE_HEIGHT_250,
  standard: BANNER_HEIGHT_50,
};

/**
 * Gets size for a type (any value of `AdType` is allowed)
 */
const getSizeForType = (type: AdType) => sizeForType[type] || BANNER_HEIGHT_50;

type BannerViewProps = {
  type: AdType,
  onPress: Function,
  onError: Function,
};

const BannerView = (props: BannerViewProps) => {
  const { type, onPress, onError, style, ...restProps } = props;
  const size = getSizeForType(type);

  return (
    <CTKBannerView
      size={size}
      style={[style, { height: size.height }]}
      {...restProps}
    />
  );
};

export default BannerView;
