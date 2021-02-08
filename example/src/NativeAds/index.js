import React, {Component} from 'react';
import {NativeAdsManager, AdSettings} from 'react-native-fbads';
import {Container} from 'native-base';
import {nativeAdPlacementId} from '../Variables';

import NativeAdView from './NativeAdView';

export default class NativeAd extends Component {
  adsManager = new NativeAdsManager(nativeAdPlacementId);

  render() {
    return (
      <Container
        style={{
          justifyContent: 'center',
          backgroundColor: '#fff',
          padding: 20,
        }}>
        <NativeAdView
          adsManager={this.adsManager}
          adChoicePosition="bottomRight"
        />
      </Container>
    );
  }
}
