/**
 * Sample React Native FBAds App
 *
 * @flow
 */

import React from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';

import FullAd from './components/FullAd';
import { NativeAdsManager, InterstitialAdManager, BannerView } from '../';

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
  onBannerPress = () => console.log('Ad clicked!');
  onBannerError = (event) => console.log('Ad error :(', event.nativeEvent);

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
          style={styles.banner50}
          placementId="1912255062335197_1915775421983161"
          onPress={this.onBannerPress}
          onError={this.onBannerError}
        />
        <BannerView
          type="large"
          style={styles.banner90}
          placementId="1912255062335197_1954647211429315"
          onPress={this.onBannerPress}
          onError={this.onBannerError}
        />
        <BannerView
          type="rectangle"
          style={styles.bannerRectangle}
          placementId="1912255062335197_1954647484762621"
          onPress={this.onBannerPress}
          onError={this.onBannerError}
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
  banner50: {
    alignSelf: 'stretch',
    height: 50,
  },
  banner90: {
    alignSelf: 'stretch',
    height: 90,
  },
  bannerRectangle: {
    alignSelf: 'stretch',
    height: 250,
  },
});

AppRegistry.registerComponent('MainApp', () => MainApp);
