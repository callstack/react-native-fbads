import React from 'react';
import { requireNativeComponent, StyleSheet, Platform, } from 'react-native';
import { AdChoicesViewContext, } from './withNativeAd';
// tslint:disable-next-line:variable-name
const NativeAdChoicesView = requireNativeComponent('AdChoicesView', null);
export default class AdChoicesView extends React.Component {
    render() {
        return (<AdChoicesViewContext.Consumer>
        {(placementId) => (<NativeAdChoicesView style={[styles.adChoice, this.props.style]} placementId={placementId} location={this.props.location} expandable={this.props.expandable}/>)}
      </AdChoicesViewContext.Consumer>);
    }
}
AdChoicesView.defaultProps = {
    location: 'topLeft',
    expandable: false,
};
const styles = StyleSheet.create({
    adChoice: Object.assign({ backgroundColor: 'transparent' }, Platform.select({
        ios: {
            width: 0,
            height: 0,
        },
        android: {
            width: 22,
            height: 22,
        },
    })),
});
