import React from 'react';
import { requireNativeComponent } from 'react-native';
import { AdIconViewContext } from './withNativeAd';
// tslint:disable-next-line:variable-name
export const NativeAdIconView = requireNativeComponent('AdIconView', null, {});
class AdIconViewChild extends React.Component {
    constructor() {
        super(...arguments);
        this.iconView = null;
        this.handleAdIconViewRef = (ref) => {
            if (this._iconView) {
                this.props.unregister(this._iconView);
                this._iconView = null;
            }
            if (ref) {
                this.props.register(ref);
                this._iconView = ref;
            }
        };
    }
    render() {
        return <NativeAdIconView {...this.props} ref={this.handleAdIconViewRef}/>;
    }
}
export default class AdIconView extends React.Component {
    render() {
        return (<AdIconViewContext.Consumer>
        {(contextValue) => (<AdIconViewChild {...this.props} {...contextValue}/>)}
      </AdIconViewContext.Consumer>);
    }
}
