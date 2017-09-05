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

const NativeAdClickable = requireNativeComponent('CTKNativeAdClickable', null);


const NativeAdClickableComponent = props => {
    return <NativeAdClickable {...props}>
        {
            React.Children.map(props.children,(child)=>{
                return child;
            })
        }
    </NativeAdClickable>;
}

export default NativeAdClickableComponent;