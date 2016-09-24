/**
 * @flow
 */

import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { withNativeAd } from '../../';

const FullNativeAd = withNativeAd(({ nativeAd }) => (
  <View style={styles.container}>
    {nativeAd.icon && (
      <Image style={styles.icon} source={{ uri: nativeAd.icon }} />
    )}
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>{nativeAd.title}</Text>
      {nativeAd.subtitle && (
        <Text style={styles.subtitle}>{nativeAd.subtitle}</Text>
      )}
      {nativeAd.description && (
        <Text style={styles.description}>{nativeAd.description}</Text>
      )}
      <View style={styles.button}>
        <Text style={styles.buttonText}>{nativeAd.callToActionText}</Text>
      </View>
    </View>
  </View>
));

const styles = StyleSheet.create({

});

export default FullNativeAd;