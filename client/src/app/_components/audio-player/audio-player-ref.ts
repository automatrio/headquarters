import { ComponentRef } from "@angular/core";
import { AudioPlayerComponent } from "./audio-player.component";

export class AudioPlayerRef
{
    constructor(private componentRef: ComponentRef<AudioPlayerComponent>)
    {}

    close()
    {
        this.componentRef.destroy();
    }
}
