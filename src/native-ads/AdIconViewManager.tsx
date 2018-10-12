import React from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';

import {
  AdIconViewContext,
  AdIconViewContextValueType,
} from './contexts';
import { NativeAd } from './nativeAd';

export interface AdIconViewProps extends ViewProps {
  nativeAd: NativeAd;
}

// tslint:disable-next-line:variable-name
export const NativeAdIconView = requireNativeComponent<AdIconViewProps>(
  'AdIconView',
);

class AdIconViewChild extends React.Component<
  AdIconViewProps & AdIconViewContextValueType
> {
  private iconView: React.ReactNode | null = null;

  private handleAdIconViewRef = (ref: React.ReactNode) => {
    if (this.iconView) {
      this.props.unregister();
      this.iconView = null;
    }

    if (ref) {
      this.props.register(ref);
      this.iconView = ref;
    }
  }

  render() {
    return <NativeAdIconView {...this.props} ref={this.handleAdIconViewRef} />;
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
