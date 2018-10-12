import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
interface AdChoicesProps {
    location: AdChoiceLocation;
    expandable: boolean;
    style?: StyleProp<ViewStyle>;
}
declare type AdChoiceLocation = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export default class AdChoicesView extends React.Component<AdChoicesProps> {
    static defaultProps: AdChoicesProps;
    render(): JSX.Element;
}
export {};
