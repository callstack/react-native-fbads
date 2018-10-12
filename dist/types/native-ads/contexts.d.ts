import React, { ReactNode } from 'react';
declare type ReactNodeReceiver = (n: ReactNode) => void;
export interface MultipleRegisterablesContextValueType {
    unregister: ReactNodeReceiver;
    register: ReactNodeReceiver;
}
export interface RegisterableContextValueType {
    register: ReactNodeReceiver;
    unregister: () => void;
}
export declare type TriggerableContextValueType = MultipleRegisterablesContextValueType;
export declare type AdIconViewContextValueType = RegisterableContextValueType;
export declare type MediaViewContextValueType = RegisterableContextValueType;
export declare type AdChoicesViewContextValueType = string;
export declare const TriggerableContext: React.Context<MultipleRegisterablesContextValueType>;
export declare const MediaViewContext: React.Context<RegisterableContextValueType>;
export declare const AdIconViewContext: React.Context<RegisterableContextValueType>;
export declare const AdChoicesViewContext: React.Context<string>;
export {};
