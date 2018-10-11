import React from 'react';
import {
  findNodeHandle,
  requireNativeComponent,
  View,
  ViewPropTypes,
  Text,
  TextProps,
} from 'react-native';

import {
  TriggerableContext,
  TriggerableContextValueType,
} from './withNativeAd';

type PropsType = ViewPropTypes & TriggerableContextValueType;

class TriggerableViewChild extends React.Component<TextProps> {
  private wrapperRef: View;

  private handleWrapperRef = (ref: View) => {
    if (this._wrapperRef) {
      this.props.unregister(this.wrapperRef);
      this.wrapperRef = null;
    }

    if (ref) {
      this.props.register(ref);
      this.wrapperRef = ref;
    }
  }

  render() {
    return <Text {...this.props} ref={this.handleWrapperRef} />;
  }
}

export default class TriggerableView extends React.Component<TextProps> {
  render() {
    return (
      <TriggerableContext.Consumer>
        {(contextValue: TriggerableContextValueType) => (
          <TriggerableViewChild {...this.props} {...contextValue} />
        )}
      </TriggerableContext.Consumer>
    );
  }
}
