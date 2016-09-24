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
    <View>
      <Text style={styles.title}>{nativeAd.title}</Text>
      {nativeAd.subtitle && (
        <Text style={styles.subtitle}>{nativeAd.subtitle}</Text>
      )}
      {nativeAd.description && (
        <Text style={styles.description}>{nativeAd.description}</Text>
      )}
      <View style={styles.button}>
        <Text>{nativeAd.callToActionText}</Text>
      </View>
    </View>
  </View>
));

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
    marginTop: 5,
  },
  button: {
    borderColor: '#CDCDCD',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  description: {
    fontSize: 12,
    opacity: 0.8,
  },
  subtitle: {
    fontSize: 13,
    fontStyle: 'italic',
  },
});

export default FullNativeAd;
