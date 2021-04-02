import { OverlayRef } from "@angular/cdk/overlay";
import { ComponentRef, Inject } from "@angular/core";
import { NavpieComponent } from "./navpie.component";

export class NavpieRef
{
    public component: NavpieComponent

    constructor(
        
        private overlay: OverlayRef
    ) {}

    close()
    {
        this.overlay.backdropElement.remove();
        this.overlay.dispose();
    }
}