import React from 'react';
const defaultValue = {
    register: () => {
        throw new Error('Stub!');
    },
    unregister: () => {
        throw new Error('Stub!');
    },
};
// tslint:disable-next-line:variable-name
export const TriggerableContext = React.createContext(defaultValue);
// tslint:disable-next-line:variable-name
export const MediaViewContext = React.createContext(defaultValue);
// tslint:disable-next-line:variable-name
export const AdIconViewContext = React.createContext(defaultValue);
// tslint:disable-next-line:variable-name
export const AdChoicesViewContext = React.createContext('');
