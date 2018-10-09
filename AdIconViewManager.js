// @flow
import * as React from 'react';
import { requireNativeComponent } from 'react-native';

import { AdIconViewContext } from './withNativeAd';
import type { AdIconViewContextValueType } from './withNativeAd';

export const NativeAdIconView = requireNativeComponent('AdIconView', null, {});

class AdIconViewChild extends React.Component<PropsType> {
  _iconView: ?React.Node;

  _handleAdIconViewRef = (ref: ?React.Node) => {
    if (this._iconView) {
      this.props.unregister(this._iconView);
      this._iconView = null;
    }

    if (ref) {
      this.props.register(ref);
      this._iconView = ref;
    }
  };

  render() {
    return <NativeAdIconView {...this.props} ref={this._handleAdIconViewRef} />;
  }
}

export default class AdIconView extends React.Component<{}> {
  render() {
    return (
      <AdIconViewContext.Consumer>
        {(contextValue: AdIconViewContextValueType) => (
          <AdIconViewChild {...this.props} {...contextValue} />
        )}
      </AdIconViewContext.Consumer>
    );
  }
}
