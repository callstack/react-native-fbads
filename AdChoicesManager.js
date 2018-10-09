// @flow
import React, { PropTypes } from 'react';
import { requireNativeComponent, StyleSheet, Platform } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import { AdChoicesViewContext } from './withNativeAd';
import type { AdChoicesViewContextValueType } from './withNativeAd';

const NativeAdChoicesView = requireNativeComponent('AdChoicesView', null);

type AdChoiceLocation = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

type Props = {
  location: AdChoiceLocation,
  expandable: boolean,
  style?: ViewStyleProp
};

export default class AdChoicesView extends React.Component<Props> {
  static defaultProps: Props = {
    location: 'topLeft',
    expandable: false
  };

  render() {
    return (
      <AdChoicesViewContext.Consumer>
        {(placementId: AdChoicesViewContextValueType) => (
          <NativeAdChoicesView
            style={[styles.adChoice, this.props.style]}
            placementId={placementId}
            location={this.props.location}
            expandable={this.props.expandable}
          />
        )}
      </AdChoicesViewContext.Consumer>
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
    })
  }
});
