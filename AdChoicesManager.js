// @flow
import React, {PropTypes} from 'react';
import { requireNativeComponent, StyleSheet, Platform } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet'

const NativeAdChoicesView = requireNativeComponent('AdChoicesView', null);

type Props = {
    placementId: string | null;
    expandable: boolean;
    style?: ViewStyleProp;
}

const styles = StyleSheet.create({
    adChoice: {
        backgroundColor: 'transparent',
        ...Platform.select({
            ios: {
                width: 0, height: 0,
            },
            android: {
                width: 22, height: 22,
            },
        }),
    },
    topLeft: {
        position: 'absolute',
        left: 0,
        top: 0
    }
})

export default class AdChoicesView extends React.Component<Props> {
    static defaultProps : Props = {
        placementId: null,
        expandable: false,
        style: styles.topLeft
    }
    
    render() {   
        if (!this.props.placementId) {
            return null;
        }

        return (
            <NativeAdChoicesView
                style={[styles.adChoice, this.props.style]}
                placementId={this.props.placementId}
                expandable={this.props.expandable}
            />
        );
    }
}

