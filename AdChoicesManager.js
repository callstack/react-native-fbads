// @flow
import React, { PropTypes } from 'react';
import { requireNativeComponent, StyleSheet, Platform } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet'

const NativeAdChoicesView = requireNativeComponent('AdChoicesView', null);

type AdChoiceLocation = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

type Props = {
  placementId: string | null,
  location: AdChoiceLocation,
  expandable: boolean,
  style?: ViewStyleProp;
};

export default class AdChoicesView extends React.Component<Props> {
  static defaultProps: Props = {
    location: 'topLeft',
    placementId: null,
    expandable: false
  };

  render() {
    if (!this.props.placementId) {
      return null;
    }

    return (
      <NativeAdChoicesView
        style={[styles.adChoice, this.props.style]}
        placementId={this.props.placementId}
        location={this.props.location}
        expandable={this.props.expandable}
      />
    );
  }
}

let styles = StyleSheet.create({
  adChoice: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        width: 0,
        height: 0
      },
      android: {
        width: 22,
        height: 22
      }
    }),
  }
});
