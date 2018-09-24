import React, {PropTypes} from 'react';
import {requireNativeComponent, StyleSheet, Platform} from 'react-native';

const NativeAdChoicesView = requireNativeComponent('AdChoicesView', null);

export default class AdChoicesView extends React.Component<Object> {
    render() {
        if (!this.props.placementId) {
            return null;
        }

        return (
            <NativeAdChoicesView
                placementId={this.props.placementId}
                style={[styles.adChoice, this.getPositionStyle()]}
                location={this.props.position || 'topRight'}/>
        );
    }

    getPositionStyle = () => {
        switch (this.props.position) {
            case 'topLeft':
                return styles.topLeft;
            case 'topRight':
                return styles.topRight;
            case 'bottomLeft':
                return styles.bottomLeft;
            case 'bottomRight':
                return styles.bottomRight;
            default:
                return null;
        }
    }
}

let styles = StyleSheet.create({
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
        position: 'absolute',
    },
    topLeft: {
        left: 0,
        top: 0,
    },
    topRight: {
        top: 0,
        right: 0
    },
    bottomLeft: {
        left: 0,
        bottom: 0,
    },
    bottomRight: {
        bottom: 0,
        right: 0
    }

})