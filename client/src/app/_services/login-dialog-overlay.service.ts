import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injector } from '@angular/core';
import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { defaultLoginDialogConfig, LoginDialogConfig } from '../login-dialog/login-dialog-config';
import { LoginDialogOverlayRef } from '../login-dialog/login-dialog-overlay-ref';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class LoginDialogOverlayService {

  constructor(
    private overlay: Overlay
  ) { }

  open(config: LoginDialogConfig = {}) : LoginDialogOverlayRef
  {
    const dialogConfig = { ...defaultLoginDialogConfig, ...config };

    // returns an OverlayRef, which is, actually, a PortalHost
    const overlayRef = this.createOverlay(dialogConfig);

    // instantiate and provide remote control
    const loginDialogOverlayRef = new LoginDialogOverlayRef(overlayRef);

    // creates a portal from and for the component
    const loginDialogPortal = new ComponentPortal(LoginDialogComponent, null, this.createInjector(loginDialogOverlayRef));

    // dispose of the overlay when clicking on the background


    // attaches said portal to the PortalHost created above
    const componentRef: ComponentRef<LoginDialogComponent> = overlayRef.attach(loginDialogPortal);
    
    // attach the component to the remote control
    loginDialogOverlayRef.componentInstance = componentRef.instance;

    overlayRef.backdropClick().subscribe(
      _ => loginDialogOverlayRef.close()
    );

    return loginDialogOverlayRef;

  }

  private getOverlayConfig(config: LoginDialogConfig): OverlayConfig
  {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: positionStrategy
    });

    return overlayConfig;
  }

  private createOverlay(config: LoginDialogConfig)
  {
    const overlayConfig = this.getOverlayConfig(config);

    return this.overlay.create(overlayConfig);
  }

  private createInjector(loginDialogOverlayRef: LoginDialogOverlayRef) : Injector
  {
    return Injector.create(
      {
        providers:
        [
          {provide: LoginDialogOverlayRef, useValue: loginDialogOverlayRef}
        ]
      }
    );
  }
}