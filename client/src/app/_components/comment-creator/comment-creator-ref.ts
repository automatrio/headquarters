import { ComponentRef, ViewRef } from "@angular/core";
import { CommentCreatorComponent } from "./comment-creator.component";

export class CommentCreatorRef
{
    hostView: ViewRef;

    constructor(
        private componentRef: ComponentRef<CommentCreatorComponent>
    )
    {
        this.hostView = componentRef.hostView;
    }

    quit()
    {
        this.componentRef.destroy();
    }

    changeAnimationState(state: "off" | "on")
    {
        this.componentRef.instance.animationState = state; 
    }
}