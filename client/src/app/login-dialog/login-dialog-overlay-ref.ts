import { AnimationEvent } from "@angular/animations";
import { OverlayRef } from "@angular/cdk/overlay";
import { HostListener, OnInit } from "@angular/core";
import { cwd } from "node:process";
import { Observable, ReplaySubject, Subject } from "rxjs";
import { filter, take } from "rxjs/operators";
import { LoginDialogComponent } from "./login-dialog.component";

export class LoginDialogOverlayRef
{
    componentInstance: LoginDialogComponent;

    private _beforeClosed = new Subject<void>();
    private _afterClosed  = new Subject<void>();

    constructor(
        private overlayRef: OverlayRef
    ) { }

    close(): void {
        this.componentInstance.animationStateChanged.pipe( //subscribing to the eventEmitter
            filter(event => event.phaseName === 'start'),
            take(1))
            .subscribe( () => 
            {
                console.log("Close pipe for start animation ongoing.");
                this._beforeClosed.next();
                this._beforeClosed.complete();
                this.overlayRef.detachBackdrop();
            });

        this.componentInstance.animationStateChanged.pipe(
            filter((event: AnimationEvent) => event.phaseName === 'done'
            && event.toState == 'leave'),
            take(1))
            .subscribe( () =>
            {
                console.log("Close pipe for leave animation ongoing.");
                this.overlayRef.dispose(); // closes the overlay
                this._afterClosed.next();
                this._afterClosed.complete();

                // clearing it so as not to have any memory leaks
                this.componentInstance = null;
            });

        this.componentInstance.startExitAnimation();
    }

    beforeClose(): Observable<void>
    { 
        return this._beforeClosed.asObservable();
    }

    afterClosed(): Observable<void>
    { 
        return this._afterClosed.asObservable();
    }

}