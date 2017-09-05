import React, { Component, PropTypes } from 'react';
import { View, requireNativeComponent } from 'react-native';

var cfg = {
    nativeOnly: {
        shouldNotifyLoadEvents: true
    },
    propTypes: {
        nativeAdView: PropTypes.number | PropTypes.element,
        ...View.propTypes
    }
};

const MediaView = requireNativeComponent('CTKMediaView', null);


const MediaViewComponent = props => {
    return <MediaView {...props} />;
}

export default MediaViewComponent;