/**
 * Sample React Native FBAds App
 *
 * @flow
 */

import React from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';

import FullAd from './components/FullAd';
import { NativeAdsManager, InterstitialAdManager, BannerView, AdSettings } from '../';

AdSettings.addTestDevice();
// AdSettings.clearTestDevices();
const adsManager = new NativeAdsManager('1912255062335197_1912257885668248');

class MainApp extends React.Component {
  showFullScreenAd = () => {
    InterstitialAdManager.showAd('1912255062335197_1914986612062042')
      .then(didClick => {
        console.log(didClick);
      })
      .catch(err => {
        console.log(err);
      });
  };

  onBannerAdPress = () => console.log('Ad clicked!');
  onBannerAdError = (event) => console.log('Ad error :(', event.nativeEvent);

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.p}>
          One of the coolest features about native ads
          is that they nicely integrate with the general
          app look & feel
        </Text>
        <FullAd adsManager={adsManager} />
        <TouchableOpacity onPress={this.showFullScreenAd}>
          <Text>Show interstitial ad</Text>
        </TouchableOpacity>
        <BannerView
          type="large"
          placementId="1912255062335197_1954647211429315"
          onPress={this.onBannerAdPress}
          onError={this.onBannerAdError}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  p: {
    marginBottom: 10,
    marginHorizontal: 40,
    textAlign: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('MainApp', () => MainApp);
