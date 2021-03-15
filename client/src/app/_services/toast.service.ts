import { ComponentPortal } from '@angular/cdk/portal';
import { Inject, Injectable, Injector, OnInit } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ToastComponent } from '../toast/toast.component';
import { ToastRef } from '../toast/toast-ref';
import { defaultToastConfig, ToastConfig, ToastData, TOAST_CONFIG_TOKEN } from '../toast/toast-config';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  // for storing the current toasts and keeping control of the last one
  currentToasts: { [key: number]: ToastRef } = {};
  MAX_TOASTS = 6;
  toastIndex: number = 0;
  canReplaceToast: boolean;

  // cosmetics
  PADDING = 10;

  constructor(
    private overlay: Overlay,
    @Inject(TOAST_CONFIG_TOKEN) private toastConfig: ToastConfig) 
    {
      this.createEmptyDictionary(this.currentToasts, this.MAX_TOASTS);
    }

  displayToast(data: ToastData, config: ToastConfig = {}) : ToastRef
  {
    // create an overlay, a portal, and attach the latter to the former
    const userProvidedConfig = {...defaultToastConfig, ...config};
    const overlayRef = this.overlay.create(this.getOverlayConfig(userProvidedConfig));
    const toastRef = new ToastRef(overlayRef);
      // setting up properties
      toastRef.currentToastIndex = this.toastIndex;

    const injector = Injector.create({
      providers:
        [
          {provide: ToastData, useValue: data},
          {provide: ToastRef, useValue: toastRef},
        ]
    });
    const toastPortal = new ComponentPortal(ToastComponent, null, injector);
    const componentRef = overlayRef.attach(toastPortal);
      // setting up properties
      toastRef.toastComponent = componentRef.instance;

    if(this.canReplaceToast)
    {
      this.replaceToast(this.toastIndex);
    }

    // done

    // store the newly created toast in due sequence
    this.currentToasts[this.toastIndex] = toastRef;
    this.incrementIndex();

    // in case of a toast is deleted
    toastRef.hasClosed$.subscribe(
      (value: number) => {
        this.deleteToast(value);
        this.toastIndex = value;
      }
    );

    return toastRef;
  }

  private getOverlayConfig(config: ToastConfig): OverlayConfig
  {
    const positionStrategy = this.overlay
      .position()
      .global()
      .bottom(this.getNewToastPosition(config))
      .right(config.position.right + 'pt');

    const overlayConfig = new OverlayConfig({
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: positionStrategy
    });

    return overlayConfig;
  }

  getNewToastPosition(config: ToastConfig): string
  {
    const position = this.currentToasts[0]?.isVisible()
    ? config.position.bottom + (this.currentToasts[0].getPosition().height + this.PADDING) * this.toastIndex
    : config.position.bottom;
     
    return position + "px";
  }

  createEmptyDictionary(dictionary: {[key: number]: ToastRef}, length: number)
  {
    for (let i = 0; i < length; i++) {
      dictionary[i] = null;
    }
  }

  incrementIndex()
  {
    for(let key = 0; key < this.MAX_TOASTS; key++)
    {
      if(this.currentToasts[key] == null)
      {
        this.toastIndex = key;
        this.canReplaceToast = false;
        return;
      }
      continue;
    }
    this.toastIndex++;
    this.toastIndex = this.toastIndex % this.MAX_TOASTS;
    this.canReplaceToast = true;
  }

  deleteToast(value: number)
  {
    this.currentToasts[value] = null;
  }

  replaceToast(value: number)
  {
    this.currentToasts[value].close();
    this.deleteToast(value);
  }
  
}