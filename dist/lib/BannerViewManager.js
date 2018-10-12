var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React from 'react';
import { requireNativeComponent } from 'react-native';
// tslint:disable-next-line:variable-name
const CTKBannerView = requireNativeComponent('CTKBannerView');
const sizeForType = {
    large: 90,
    rectangle: 250,
    standard: 50,
};
const getSizeForType = (type) => sizeForType[type];
// tslint:disable-next-line:variable-name
const BannerView = (props) => {
    const { type, onPress, onError, style } = props, restProps = __rest(props, ["type", "onPress", "onError", "style"]);
    const size = getSizeForType(type);
    return (<CTKBannerView size={size} onAdPress={onPress} onAdError={onError} style={[style, { height: size }]} {...restProps}/>);
};
export default BannerView;
