import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MaterialIconsService {

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer)
  {

    this.iconRegistry.addSvgIcon('twitter-icon', this.sanitizer.bypassSecurityTrustResourceUrl("someURL"));

  }

}
