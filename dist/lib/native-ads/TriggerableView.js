import React from 'react';
import { Text } from 'react-native';
import { TriggerableContext, } from './contexts';
class TriggerableViewChild extends React.Component {
    constructor() {
        super(...arguments);
        this.wrapperRef = null;
        this.handleWrapperRef = (ref) => {
            if (this.wrapperRef) {
                this.props.unregister(this.wrapperRef);
                this.wrapperRef = null;
            }
            if (ref) {
                this.props.register(ref);
                this.wrapperRef = ref;
            }
        };
    }
    render() {
        return <Text {...this.props} ref={this.handleWrapperRef}/>;
    }
}
export default class TriggerableView extends React.Component {
    render() {
        return (<TriggerableContext.Consumer>
        {(contextValue) => (<TriggerableViewChild {...this.props} {...contextValue}/>)}
      </TriggerableContext.Consumer>);
    }
}
