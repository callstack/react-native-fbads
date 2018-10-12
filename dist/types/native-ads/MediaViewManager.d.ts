import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { NativeAd } from './nativeAd';
interface MediaViewProps {
    nativeAd: NativeAd;
    style: StyleProp<ViewStyle>;
}
export declare const NativeMediaView: React.ComponentClass<Partial<import("prop-types").InferProps<import("prop-types").ValidationMap<MediaViewProps>>> & {}, any>;
export default class MediaView extends React.Component<MediaViewProps> {
    render(): JSX.Element;
}
export {};
