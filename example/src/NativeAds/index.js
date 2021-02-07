import React, {Component} from 'react';
import {NativeAdsManager, AdSettings} from 'react-native-fbads';
import {Container} from 'native-base';
import NativeAdView from './NativeAdView';

export default class NativeAd extends Component {
  render() {
    return (
      <Container
        style={{
          justifyContent: 'center',
          backgroundColor: '#fff',
          padding: 20,
        }}>
        <NativeAdView
          adsManager={this.props.adsManager}
          adChoicePosition="bottomRight"
        />
      </Container>
    );
  }
}
