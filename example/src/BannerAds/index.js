import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container} from 'native-base';
import {BannerView} from 'react-native-fbads';
import {bannerAdPlacementId} from '../Variables';

export default class BannerAd extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.bannerContainer}>
          <BannerView
            placementId={bannerAdPlacementId}
            type="standard"
            onPress={() => console.log('click')}
            onError={(err) => console.log('error', err)}
          />
        </View>
        <View style={styles.bannerContainer}>
          <BannerView
            placementId={bannerAdPlacementId}
            type="large"
            onPress={() => console.log('click')}
            onError={(err) => console.log('error', err)}
          />
        </View>
        <View style={styles.bannerContainer}>
          <BannerView
            placementId={bannerAdPlacementId}
            type="rectangle"
            onPress={() => console.log('click')}
            onError={(err) => console.log('error', err)}
          />
        </View>
      </Container>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  bannerContainer: {
    marginVertical: 10,
  },
});
