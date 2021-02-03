import React, {Component} from 'react';
import {Container} from 'native-base';
import {Scene, Router} from 'react-native-router-flux';

import Main from './src';
import NativeAd from './src/NativeAds';
import BannerAd from './src/BannerAds';
import InterstitialAd from './src/InterstitialAds';

export default class App extends Component {
  render() {
    return (
      <Container>
        <Router>
          <Scene key="root" hideNavBar>
            <Scene
              key="welcome"
              component={Main}
              title="React Native Facebook Ads"
              hideNavBar={false}
              direction="vertical"
            />
            <Scene
              key="nativeAd"
              title="Native Ad"
              component={NativeAd}
              hideNavBar={false}
              direction="vertical"
            />
            <Scene
              key="bannerAd"
              title="Banner Ad"
              component={BannerAd}
              hideNavBar={false}
              direction="vertical"
            />
            <Scene
              key="interstitialAd"
              title="Interstitial Ad"
              component={InterstitialAd}
              hideNavBar={false}
              direction="vertical"
            />
          </Scene>
        </Router>
      </Container>
    );
  }
}
