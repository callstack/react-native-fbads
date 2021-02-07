import React, {Component} from 'react';
import {StyleSheet, Dimensions, TouchableHighlight} from 'react-native';
import {Container, Text} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {AdSettings, NativeAdsManager} from 'react-native-fbads';

import {nativeAdPlacementId} from './Variables';

const {width} = Dimensions.get('window');

export default class Main extends Component {
  adsManager = new NativeAdsManager(nativeAdPlacementId);
  async componentDidMount() {
    AdSettings.setLogLevel('debug');
    AdSettings.addTestDevice(AdSettings.currentDeviceHash);

    const trackingStatus = await AdSettings.getTrackingStatus();
    if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
      AdSettings.setAdvertiserIDCollectionEnabled(true);
      return;
    }
    console.log('here');
    const requestedStatus = await AdSettings.requestTrackingPermission();
    if (requestedStatus === 'authorized' || requestedStatus === 'unavailable') {
      AdSettings.setAdvertiserIDCollectionEnabled(true);
    }
  }

  componentWillUnmount() {
    AdSettings.clearTestDevices();
  }
  render() {
    return (
      <Container style={styles.container}>
        <TouchableHighlight
          underlayColor="#b2bbbc"
          style={styles.button}
          onPress={() => Actions.nativeAd({adsManager: this.adsManager})}>
          <Text style={styles.buttonText}>Native Ad</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="#b2bbbc"
          onPress={() => Actions.bannerAd()}
          style={styles.button}>
          <Text style={styles.buttonText}>Banner Ad</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="#b2bbbc"
          onPress={() => Actions.interstitialAd()}
          style={styles.button}>
          <Text style={styles.buttonText}>Interstitial Ad</Text>
        </TouchableHighlight>
      </Container>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    width,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    elevation: 3,
    borderRadius: 10,
    paddingVertical: 10,
    width: width - 80,
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#a70f0a',
  },
});
