import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable, Injector } from '@angular/core';
import { provideRoutes } from '@angular/router';
import { defaultNavpieConfig, NavpieConfig } from '../_components/navpie/navpie-config';
import { NavpieRef } from '../_components/navpie/navpie-ref';
import { NavpieComponent } from '../_components/navpie/navpie.component';

@Injectable({
  providedIn: 'root'
})
export class NavpieOverlayService {

  constructor(private overlay: Overlay) { }

  open(config: NavpieConfig = {}) : NavpieRef
  {
    const userProvidedConfig = { ...defaultNavpieConfig, ...config };
    const overlayRef = this.overlay.create(this.getOverlayConfig(userProvidedConfig));
    const portal = new ComponentPortal(NavpieComponent, null, this.createInjector(overlayRef));
    const componentRef = portal.attach(overlayRef);
    const navpieRef = new NavpieRef(overlayRef);
    const backdropClickSubscription = overlayRef.backdropClick().subscribe(
      () => {
        navpieRef.close();
        backdropClickSubscription.unsubscribe();
      }
    );

    
    navpieRef.component = componentRef.instance;

    return navpieRef;
  }

  getOverlayConfig(config: NavpieConfig) : OverlayConfig
  {
    const positionStrategy = this.overlay
      .position()
      .global()
      .top(config.position.top + "px")
      .left(config.position.left + "px")
      // .centerHorizontally()
      // .centerVertically()

    const overlayConfig = new OverlayConfig(
      {
        positionStrategy: positionStrategy,
        scrollStrategy: this.overlay.scrollStrategies.block(),
        panelClass: config.panelClass,
        backdropClass: config.backdropClass,
        hasBackdrop: config.hasBackdrop,
        disposeOnNavigation: true
      });

    return overlayConfig; 
  }

  createInjector(overlayRef: OverlayRef)
  {
    return Injector.create({
      providers:
        [
          { provide: OverlayRef, useValue: overlayRef }
        ]
    });
  }
}
