import React, { ReactNode } from 'react';

export type ComponentOrClass = React.ComponentClass<any> | React.Component;

type Receiver = (c: ComponentOrClass) => void;
export interface MultipleRegisterablesContextValueType {
  unregister: Receiver;
  register: Receiver;
}

export interface RegisterableContextValueType {
  register: Receiver;
  unregister: () => void;
}

export type TriggerableContextValueType = MultipleRegisterablesContextValueType;
export type AdIconViewContextValueType = RegisterableContextValueType;
export type MediaViewContextValueType = RegisterableContextValueType;
export type AdChoicesViewContextValueType = string;

const defaultValue = {
  register: () => {
    throw new Error('Stub!');
  },
  unregister: () => {
    throw new Error('Stub!');
  },
};

// tslint:disable-next-line:variable-name
export const TriggerableContext = React.createContext<
  TriggerableContextValueType
>(defaultValue);
// tslint:disable-next-line:variable-name
export const MediaViewContext = React.createContext<MediaViewContextValueType>(
  defaultValue,
);

// tslint:disable-next-line:variable-name
export const AdIconViewContext = React.createContext<
  AdIconViewContextValueType
>(defaultValue);

// tslint:disable-next-line:variable-name
export const AdChoicesViewContext = React.createContext<
  AdChoicesViewContextValueType
>('');
