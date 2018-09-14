import React, {PropTypes} from 'react';
import {requireNativeComponent, StyleSheet, Platform} from 'react-native';

const NativeAdChoicesView = requireNativeComponent('AdChoicesView', null);
let positionStyle = null;

type adChoiceLocation = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export default class AdChoicesView extends React.Component<Object> {

    location: adChoiceLocation;

    componentWillMount() {
        positionStyle = styles.topRight;

        location = this.props.position;

        if (location === 'topLeft') {
            positionStyle = styles.topLeft
        } else if (location === 'topRight') {
            positionStyle = styles.topRight
        } else if (location === 'bottomLeft') {
            positionStyle = styles.bottomLeft
        } else if (location === 'bottomRight') {
            positionStyle = styles.bottomRight
        }
    }

    componentWillUpdate(nextProps) {
        if (this.props.placementId !== nextProps.placementId) {
            this.props.placementId = nextProps.placementId
        }
    }

    render() {
        if (!this.props.placementId) {
            return null;
        }
        return (
            <NativeAdChoicesView
                placementId={this.props.placementId}
                style={[styles.adChoice, positionStyle]}
                location={this.props.position || 'topRight'}/>
        );
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