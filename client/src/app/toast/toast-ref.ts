import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ReplaySubject, Subject } from "rxjs";
import { filter, take } from "rxjs/operators";
import { ToastComponent } from "./toast.component";

export class ToastRef
{
    hasClosed$ = new ReplaySubject<number>(1);
    currentToastIndex: number;
    toastComponent: ToastComponent

    constructor(
        private overlay: OverlayRef
    ) {}

    close() : void
    {
        this.toastComponent.animationStateChanged.pipe(
            filter(event => event.phaseName == 'start'),
            take(1)
            ).subscribe( () => 
                {
                    console.log("section 1")
                    this.hasClosed$.next(this.currentToastIndex)
                });

        this.toastComponent.animationStateChanged.pipe(
            filter(event => event.phaseName == 'done' && event.toState == 'leave'),
            take(1)
            ).subscribe( () =>
                {
                    console.log("section 2")
                    this.overlay.dispose();
                    this.toastComponent = null;
                });

        this.toastComponent.startExitAnimation();
    }

    isVisible() : boolean
    {
        // returns true if overlay hasn't been disposed of
        return !!(this.overlay) && !!(this.overlay.overlayElement);
    }

    getPosition() : DOMRect
    {
        return this.overlay.overlayElement.getBoundingClientRect()
    }
}