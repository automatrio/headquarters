import { Overlay, OverlayRef } from "@angular/cdk/overlay";

export class ToastRef
{
    constructor(
        private overlay: OverlayRef
    ) {}

    close()
    {
        this.overlay.dispose();
    }
}