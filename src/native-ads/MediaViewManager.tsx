import React, { ReactNode } from 'react';
import {
  requireNativeComponent,
  StyleProp,
  ViewStyle,
  ViewProps,
} from 'react-native';
import { MediaViewContext, MediaViewContextValueType } from './contexts';

export type MediaViewProps = ViewProps;

// tslint:disable-next-line:variable-name
export const NativeMediaView = requireNativeComponent<MediaViewProps>(
  'MediaView',
);

class MediaViewChild extends React.Component<
  MediaViewProps & MediaViewContextValueType
> {
  private mediaView: ReactNode;

  private handleMediaViewMount = (ref: ReactNode) => {
    if (this.mediaView) {
      this.props.unregister();
      this.mediaView = null;
    }

    if (ref) {
      this.props.register(ref);
      this.mediaView = ref;
    }
  }

  render() {
    return <NativeMediaView {...this.props} ref={this.handleMediaViewMount} />;
  }
}

export default class MediaView extends React.Component<MediaViewProps> {
  render() {
    return (
      <MediaViewContext.Consumer>
        {(contextValue: MediaViewContextValueType) => (
          <MediaViewChild {...this.props} {...contextValue} />
        )}
      </MediaViewContext.Consumer>
    );
  }
}
