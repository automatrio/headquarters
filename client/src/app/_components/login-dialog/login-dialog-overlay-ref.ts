import { AnimationEvent } from "@angular/animations";
import { OverlayRef } from "@angular/cdk/overlay";
import { filter, take } from "rxjs/operators";
import { LoginDialogComponent } from "./login-dialog.component";

export class LoginDialogOverlayRef
{
    componentInstance: LoginDialogComponent;

    constructor(
        private overlayRef: OverlayRef
    ) { }

    close(): void {
        this.componentInstance.animationStateChanged.pipe( //subscribing to the eventEmitter
            filter(event => event.phaseName === 'start'),
            take(1))
            .subscribe( () => 
            {
                this.overlayRef.detachBackdrop();
            });

        this.componentInstance.animationStateChanged.pipe(
            filter((event: AnimationEvent) => event.phaseName === 'done' && event.toState == 'leave'),
            take(1))
            .subscribe( () =>
            {
                this.overlayRef.dispose(); // closes the overlay
                // clearing it so as not to have any memory leaks
                this.componentInstance = null;
            });

        this.componentInstance.startExitAnimation();
    }
}