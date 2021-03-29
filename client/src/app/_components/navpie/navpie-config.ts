import { InjectionToken } from "@angular/core"

export interface NavpieConfig
{
    panelClass?: string,
    position?:
    {
        top?: string;
        left?: string;
    }
    hasBackdrop?: boolean,
    backdropClass?: string
}

export const defaultNavpieConfig : NavpieConfig =
{
    panelClass: 'navpie-overlay',
    position: {
        top: "80",
        left: "-70"
    },
    hasBackdrop: true,
    backdropClass: 'navpie-backdrop'
}

export const NAVPIE_CONFIG_TOKEN = new InjectionToken('navpie-config');