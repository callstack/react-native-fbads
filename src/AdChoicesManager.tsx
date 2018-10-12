import React from 'react';
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
} from './native-ads/contexts';

interface AdChoicesProps {
  location: AdChoiceLocation;
  expandable: boolean;
  style?: StyleProp<ViewStyle>;
}

// tslint:disable-next-line:variable-name
const NativeAdChoicesView = requireNativeComponent<
  AdChoicesProps & { placementId: string }
>('AdChoicesView');

type AdChoiceLocation = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export default class AdChoicesView extends React.Component<AdChoicesProps> {
  static defaultProps: AdChoicesProps = {
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
