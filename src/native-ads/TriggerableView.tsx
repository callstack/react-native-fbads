import React, { ReactNode } from 'react';
import { TextProps, View } from 'react-native';
import { TriggerableContext, TriggerableContextValueType } from './contexts';

class TriggerableViewChild extends React.Component<
  TextProps & TriggerableContextValueType
> {
  private wrapperRef: ReactNode | null = null;

  private handleWrapperRef = (ref: View) => {
    if (this.wrapperRef) {
      this.props.unregister(this.wrapperRef);
      this.wrapperRef = null;
    }

    if (ref) {
      const child = React.Children.only(this.props.children);
      this.wrapperRef = child;
      this.props.register(child);
    }
  }

  render() {
    // tslint:disable-next-line:variable-name
    const child = React.Children.only(this.props.children);
    return child;
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
