import React, { ReactNode } from 'react';

type ReactNodeReceiver = (n: ReactNode) => void;

export interface MultipleRegisterablesContextValueType {
  unregister: ReactNodeReceiver;
  register: ReactNodeReceiver;
}

export interface RegisterableContextValueType {
  register: ReactNodeReceiver;
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
