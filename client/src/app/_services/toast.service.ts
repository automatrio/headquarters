import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Inject, Injectable, Injector, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ToastComponent } from '../toast/toast.component';
import { ToastRef } from '../toast/toast-ref';
import { ToastConfig, ToastData, TOAST_CONFIG_TOKEN } from '../toast/toast-config';

@Injectable({
  providedIn: 'root'
})
export class ToastService implements OnInit {

  constructor(
    private snackBar : MatSnackBar,
    private overlay: Overlay,
    
    // When a component declares a dependency, Angular tries to satisfy that dependency
    // with its own ElementInjector. If the component's injector lacks the provider,
    // it passes the request up to its parent component's ElementInjector.
    // The requests keep forwarding up until Angular finds an injector that can handle
    // the request or runs out of ancestor ElementInjectors.
    @Inject(TOAST_CONFIG_TOKEN) private toastConfig: ToastConfig ) { }

  ngOnInit(): void {
  }

  displayToast(data: ToastData) : ToastRef
  {
    const overlayRef = this.overlay.create();
    const toastRef = new ToastRef(overlayRef);
    const snackBarRef = this.snackBar.openFromComponent(ToastComponent);

    const injector = Injector.create({
      providers:
        [
          {provide: ToastData, useValue: data},
          {provide: ToastRef, useValue: toastRef}
        ]
    });
    
    const toastPortal = new ComponentPortal(ToastComponent, null, injector);
    
    overlayRef.attach(toastPortal);

    return toastRef;
  }

  displayQuickMessage(message: string)
  {
    this.snackBar.open(
      message,
      null,
      {
        duration: 2000,
        panelClass: "message-toast"
      });
  }

  displayError(message: string)
  {
    this.snackBar.open(
      message,
      "Ok",
      {
        panelClass: "error-toast"
      }
    )
    this.snackBar._openedSnackBarRef.onAction().subscribe(
      result => this.snackBar.dismiss()
    );
  }
}
