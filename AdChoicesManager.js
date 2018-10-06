// @flow
import React, { PropTypes } from "react";
import { requireNativeComponent, StyleSheet, Platform } from "react-native";

const NativeAdChoicesView = requireNativeComponent("AdChoicesView", null);

type AdChoicePosition = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

type Props = {
  placementId: string | null,
  position: AdChoicePosition,
  expandable: boolean
};

export default class AdChoicesView extends React.Component<Props> {
  static defaultProps: Props = {
    position: "topLeft",
    placementId: null,
    expandable: false
  };

  render() {
    if (!this.props.placementId) {
      return null;
    }

    return (
      <NativeAdChoicesView
        style={[styles.adChoice, this.getPositionStyle(this.props.position)]}
        placementId={this.props.placementId}
        location={this.props.position}
        expandable={this.props.expandable}
      />
    );
  }

  getPositionStyle = (position: AdChoicePosition) => {
    switch (position) {
      case "topLeft":
        return styles.topLeft;
      case "topRight":
        return styles.topRight;
      case "bottomLeft":
        return styles.bottomLeft;
      case "bottomRight":
        return styles.bottomRight;
      default:
        throw new Error(`Unsupported position ${position}`);
    }
  };
}

let styles = StyleSheet.create({
  adChoice: {
    backgroundColor: "transparent",
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
    position: "absolute"
  },
  topLeft: {
    left: 0,
    top: 0
  },
  topRight: {
    top: 0,
    right: 0
  },
  bottomLeft: {
    left: 0,
    bottom: 0
  },
  bottomRight: {
    bottom: 0,
    right: 0
  }
});
