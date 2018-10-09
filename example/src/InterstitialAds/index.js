import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import { Container, Text } from 'native-base';
import { InterstitialAdManager } from 'react-native-fbads';
import { InterstitialAdPlacementId } from '../Variables';

const { width } = Dimensions.get('window');

export default class InterstitialAd extends Component<Props> {
  render() {
    return (
      <Container style={styles.container}>
        <TouchableHighlight
          underlayColor="#b2bbbc"
          style={styles.button}
          onPress={() => this._showAd()}
        >
          <Text style={styles.buttonText}>Show Interstitial Ad</Text>
        </TouchableHighlight>
      </Container>
    );
  }

  _showAd() {
    InterstitialAdManager.showAd(InterstitialAdPlacementId)
      .then(() => {})
      .catch(() => {});
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
