import React, { Component, PropTypes } from 'react';
import { View, requireNativeComponent } from 'react-native';

var cfg = {
    nativeOnly: {
        shouldNotifyLoadEvents: true
    },
    propTypes: {
        // nativeAdView: PropTypes.number,
        ...View.propTypes
    }
};

const AdChoices = requireNativeComponent('CTKAdChoice', null);


const AdChoicesComponent = props => {
    return <AdChoices {...props} />;
}

export default AdChoicesComponent;
