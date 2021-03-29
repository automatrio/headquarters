import { InjectionToken } from "@angular/core"

export interface LoginDialogConfig
{
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
}

export const defaultLoginDialogConfig: LoginDialogConfig =
{
    panelClass: 'login-dialog-panel',
    hasBackdrop: true,
    backdropClass: 'dark-backdrop'
}

export const LOGIN_DIALOG_CONFIG_TOKEN = new InjectionToken<LoginDialogConfig>('login-dialog-config');