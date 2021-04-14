import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { ActionDialogConfig, ACTION_CHOSEN_TOKEN, ACTION_STEP_TOKEN, defaultActionDialogConfig } from '../_components/content-manager/action-dialog/action-dialog-config';
import { ActionDialogRef } from '../_components/content-manager/action-dialog/action-dialog-ref';
import { ActionDialogComponent } from '../_components/content-manager/action-dialog/action-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ActionOverlayService {

  constructor(
    private overlay: Overlay
  ) { }

  callActionOverlay(
    actionDialogConfig: ActionDialogConfig,
    currentStep: number,
    actionChosen: 'create' | 'edit' | 'delete') : ActionDialogRef
  {
    const config = {...defaultActionDialogConfig, ...actionDialogConfig};
    const overlayRef = this.overlay.create(this.getOverlayConfig(config));
    const portal = new ComponentPortal(ActionDialogComponent, null, this.createInjector(currentStep, actionChosen));

    const componentRef = portal.attach(overlayRef);
    const actionDialogRef = new ActionDialogRef(overlayRef);

    const backdropClickSubscription = overlayRef.backdropClick()
      .subscribe(
      () => { 
        actionDialogRef.close()
        backdropClickSubscription.unsubscribe();
    });

    componentRef.instance.canceledActionEvent.subscribe(
      (event: boolean) =>
      {
        if(event)
        {
          actionDialogRef.close();
        }
      }
    );

    actionDialogRef.component = componentRef.instance;

    return actionDialogRef;
  }

  private getOverlayConfig(config: ActionDialogConfig)
  {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      positionStrategy: positionStrategy,
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass
    });

    return overlayConfig;
  }

  private createInjector(actionStep: number, actionChosen: 'create' | 'edit' | 'delete')
  {
    return Injector.create({
      providers: [
        {provide: ACTION_STEP_TOKEN, useValue: actionStep},
        {provide: ACTION_CHOSEN_TOKEN, useValue: actionChosen}
      ]
    });
  }
}
