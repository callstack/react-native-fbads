import * as React from 'react';
import {findNodeHandle, requireNativeComponent, View, ViewPropTypes,Text} from 'react-native';

import { TriggerableContext } from './withNativeAd';
import type { TriggerableContextValueType } from './withNativeAd';

type PropsType = ViewPropTypes & TriggerableContextValueType;

const NativeTriggerableView = requireNativeComponent('AdTriggerableView', null, {});

class TriggerableViewChild extends React.Component<PropsType> {
  _wrapperRef: ?View;

  _handleWrapperRef = (ref: ?View) => {
    if (this._wrapperRef) {
      this.props.unregister(this._wrapperRef);
      this._wrapperRef = null;
    }

    if (ref) {
      this.props.register(ref);
      this._wrapperRef = ref;
    }
  };

  render() {
      return <Text {...this.props} ref={this._handleWrapperRef} />;
  }
}

export default class TriggerableView extends React.Component<ViewPropTypes> {
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
