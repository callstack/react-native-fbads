import React from 'react';
import { requireNativeComponent } from 'react-native';
import { AdIconViewContext, } from './contexts';
// tslint:disable-next-line:variable-name
export const NativeAdIconView = requireNativeComponent('AdIconView');
class AdIconViewChild extends React.Component {
    constructor() {
        super(...arguments);
        this.iconView = null;
        this.handleAdIconViewRef = (ref) => {
            if (this.iconView) {
                this.props.unregister();
                this.iconView = null;
            }
            if (ref) {
                this.props.register(ref);
                this.iconView = ref;
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
