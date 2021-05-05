import { Overlay, OverlayConfig, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { AudioPlayerRef } from '../_components/audio-player/audio-player-ref';
import { AudioPlayerComponent } from '../_components/audio-player/audio-player.component';
import { defaultPlayerOverlayConfig, PlayerOverlayConfig } from '../_components/audio-player/playerOverlayConfig';
import { Album } from '../_models/album';

@Injectable({
  providedIn: 'root'
})
export class PlayerOverlayService {

  constructor(private overlay: Overlay) { }

  openPlayer(currentAlbum: Album, playerOverlayConfig?: PlayerOverlayConfig)
  {
    const config = {...defaultPlayerOverlayConfig, ...playerOverlayConfig};
    const overlayRef = this.overlay.create(this.createConfig(config));
    const portal = new ComponentPortal(AudioPlayerComponent, null, this.createInjector(currentAlbum));

    const componentRef =  portal.attach(overlayRef);

    const audioPlayerRef = new AudioPlayerRef(componentRef);

    return audioPlayerRef;
  }

  private createInjector(album: Album)
  {
    return Injector.create({
      providers: [
        {provide: Album, useValue: album}
      ]
    });
  }

  private createConfig(playerOverlayConfig: PlayerOverlayConfig)
  {
    const positionStrategy = this.overlay.position()
      .global()
      .bottom(playerOverlayConfig.position.bottom + 'px')
      .left(playerOverlayConfig.position.left + 'px');

    return new OverlayConfig({
      hasBackdrop: false,
      width: '380px',
      panelClass: playerOverlayConfig.panelClass,
      positionStrategy: positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
    
  }

}
