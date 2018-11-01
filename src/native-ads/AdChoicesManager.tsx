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
} from './contexts';

interface AdChoicesProps {
  location?: AdChoiceLocation;
  expandable?: boolean;
  style?: StyleProp<ViewStyle>;
}

// tslint:disable-next-line:variable-name
const NativeAdChoicesView = requireNativeComponent<
  AdChoicesProps & { placementId: string }>('AdChoicesView');

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
            style={[
              styles.adChoice,
              this.getPositionStyle(this.props.location),
              this.props.style,
            ]}
            placementId={placementId}
            location={this.props.location}
            expandable={this.props.expandable}
          />
        )}
      </AdChoicesViewContext.Consumer>
    );
  }

  getPositionStyle = (position: AdChoiceLocation) => {
    switch (position) {
      case 'topLeft':
        return styles.topLeft;
      case 'topRight':
        return styles.topRight;
      case 'bottomLeft':
        return styles.bottomLeft;
      case 'bottomRight':
        return styles.bottomRight;
      default:
        throw new Error(`Unsupported position ${position}`);
    }
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
    position: 'absolute',
  },
  topLeft: {
    left: 0,
    top: 0,
  },
  topRight: {
    top: 0,
    right: 0,
  },
  bottomLeft: {
    left: 0,
    bottom: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
  },
});
