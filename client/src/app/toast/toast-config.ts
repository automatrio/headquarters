import { InjectionToken, TemplateRef } from '@angular/core';

export class ToastData
{
    type: ToastType;
    text?: string;
}

export type ToastType = 'warning' | 'info' | 'success';

export interface ToastConfig
{
    position?:
    {
        top: number;
        right: number;
    }
    animation?:
    {
        fadeOut: number;
        fadeIn: number;
    }
}

export const defaultToastConfig: ToastConfig =
{
    position:
    {
        top: 20,
        right: 20
    },
    animation:
    {
        fadeOut: 2500,
        fadeIn: 300
    }
}

// Use an InjectionToken whenever the type you are injecting
// is not reified (does not have a runtime representation)
// such as when injecting an interface, callable type, array or parameterized type.

// _desc stands for "description", to describe what is to be injected.

export const TOAST_CONFIG_TOKEN = new InjectionToken<ToastConfig>('toast-config');