import React from 'react';
import { requireNativeComponent } from 'react-native';

import { AdIconViewContext, AdIconViewContextValueType } from './withNativeAd';

export const NativeAdIconView = requireNativeComponent('AdIconView', null, {});

export interface AdIconViewProps {}

class AdIconViewChild extends React.Component<AdIconViewProps> {
  _iconView: React.ReactNode | null = null;

  _handleAdIconViewRef = (ref: React.ReactNode) => {
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

export default class AdIconView extends React.Component<AdIconViewProps> {
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
