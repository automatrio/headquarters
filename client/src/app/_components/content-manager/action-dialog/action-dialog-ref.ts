import { OverlayRef } from "@angular/cdk/overlay";
import { ActionDialogComponent } from "./action-dialog.component";

export class ActionDialogRef
{
    component: ActionDialogComponent;

    constructor(
        private overlayRef: OverlayRef
    )
    {}

    close()
    {
        this.overlayRef.backdropElement.remove();
        this.overlayRef.dispose();
    }
}