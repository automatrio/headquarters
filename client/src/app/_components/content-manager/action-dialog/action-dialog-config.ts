import { InjectionToken } from "@angular/core";
import { ActionOptions } from "src/app/_models/actionOptions";

export class ActionDialogConfig
{
    position?: {
        top?: number;
        left?: number;
    }
    hasBackdrop: boolean;
    backdropClass?: string;
}

export const defaultActionDialogConfig = {
    hasBackdrop: true,
    backdropClass: 'dark-backdrop'
} as ActionDialogConfig;

export const ACTION_STEP_TOKEN = new InjectionToken<number>('action_step');

export const ACTION_CHOSEN_TOKEN = new InjectionToken<ActionOptions>('action_chosen');