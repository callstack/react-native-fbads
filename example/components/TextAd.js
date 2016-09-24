/**
 * @flow
 */

import React from 'react';
import { View, Text } from 'react-native';
import { withNativeAd } from '../../';

const TextAd = withNativeAd(({ nativeAd }) => (
  <View>
    <Text>{nativeAd.description}</Text>
  </View>
));

export default TextAd;