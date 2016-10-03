/**
 * Sample React Native FBAds App
 *
 * @flow
 */

import React from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

  render() {
    return (
      <View style={styles.container}>
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
          style={styles.banner}
          placementId="1912255062335197_1915775421983161"
          size={BannerView.BANNER_HEIGHT_50}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  banner: {
    alignSelf: 'stretch',
    height: 250,
  },
});

AppRegistry.registerComponent('MainApp', () => MainApp);
