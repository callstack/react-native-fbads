import React, { PropTypes } from 'react';
import {
  StyleProp,
  ViewStyle,
  requireNativeComponent,
  StyleSheet,
  Platform,
} from 'react-native';

import {
  AdChoicesViewContext,
  AdChoicesViewContextValueType,
} from './withNativeAd';

// tslint:disable-next-line:variable-name
const NativeAdChoicesView = requireNativeComponent('AdChoicesView', null);

type AdChoiceLocation = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

interface Props {
  location: AdChoiceLocation;
  expandable: boolean;
  style?: ViewStyleProp;
}

export default class AdChoicesView extends React.Component<Props> {
  static defaultProps: Props = {
    location: 'topLeft',
    expandable: false,
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

const styles = StyleSheet.create({
  adChoice: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        width: 0,
        height: 0,
      },
      android: {
        width: 22,
        height: 22,
      },
    }),
  },
});
