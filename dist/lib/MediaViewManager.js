import React from 'react';
import { requireNativeComponent } from 'react-native';
import { MediaViewContext } from './withNativeAd';
// tslint:disable-next-line:variable-name
export const NativeMediaView = requireNativeComponent('MediaView', null, {});
class MediaViewChild extends React.Component {
    constructor() {
        super(...arguments);
        this.handleMediaViewMount = (ref) => {
            if (this.mediaView) {
                this.props.unregister(this._mediaView);
                this.mediaView = null;
            }
            if (ref) {
                this.props.register(ref);
                this.mediaView = ref;
            }
        };
    }
    render() {
        return <NativeMediaView {...this.props} ref={this.handleMediaViewMount}/>;
    }
}
export default class MediaView extends React.Component {
    render() {
        return (<MediaViewContext.Consumer>
        {(contextValue) => (<MediaViewChild {...this.props} {...contextValue}/>)}
      </MediaViewContext.Consumer>);
    }
}
