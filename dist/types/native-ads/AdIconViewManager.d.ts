import React from 'react';
import { ViewProps } from 'react-native';
import { NativeAd } from './nativeAd';
export interface AdIconViewProps extends ViewProps {
    nativeAd: NativeAd;
}
export declare const NativeAdIconView: React.ComponentClass<Partial<import("prop-types").InferProps<import("prop-types").ValidationMap<AdIconViewProps>>> & {}, any>;
export default class AdIconView extends React.Component<AdIconViewProps> {
    render(): JSX.Element;
}
