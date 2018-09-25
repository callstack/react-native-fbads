import React, {PropTypes} from 'react';
import {requireNativeComponent, StyleSheet, Platform} from 'react-native';

const NativeAdChoicesView = requireNativeComponent('AdChoicesView', null);

type adChoiceLocation = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export default class AdChoicesView extends React.Component<Object> {
    
    render() {   
        if (!this.props.placementId) {
            return null;
        }

        return (
            <NativeAdChoicesView
                placementId={this.props.placementId}
                style={[styles.adChoice, this.getPositionStyle(this.props.position)]}
                location={this.props.position || 'topRight'}/>
        );
    }

    getPositionStyle = (position: adChoiceLocation) => {
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
                return styles.topLeft;
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
