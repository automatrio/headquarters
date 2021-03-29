import { InjectionToken } from '@angular/core';

export class ToastData
{
    type!: ToastType;
    status?: number;
    text?: string;
}

export type ToastType = 'warning' | 'info' | 'success';

export interface ToastConfig
{
    panelClass?: string,
    position?:
    {
        bottom: number;
        right: number;
    }
}

export const defaultToastConfig: ToastConfig =
{
    panelClass: "toast-panel",
    position:
    {
        bottom: 10,
        right: 20
    }
}

export const TOAST_CONFIG_TOKEN = new InjectionToken<ToastConfig>('toast-config');