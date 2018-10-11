import React, { ReactNode } from 'react';
import { ReactNode, requireNativeComponent } from 'react-native';
import { MediaViewContext, MediaViewContextValueType } from './withNativeAd';

// tslint:disable-next-line:variable-name
export const NativeMediaView = requireNativeComponent('MediaView', null, {});

type Props = MediaViewContextValueType;

class MediaViewChild extends React.Component<Props> {
  private mediaView: ReactNode;

  private handleMediaViewMount = (ref: ReactNode) => {
    if (this.mediaView) {
      this.props.unregister(this._mediaView);
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

export default class MediaView extends React.Component<{}> {
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
