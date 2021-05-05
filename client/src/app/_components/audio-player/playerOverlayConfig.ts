export class PlayerOverlayConfig
{
    panelClass: string;
    position: {
        left: number;
        bottom: number;
    };
}

export const defaultPlayerOverlayConfig = { 
    panelClass: 'audio-player',
    position: {
        left: 20,
        bottom: 20
    }
} as PlayerOverlayConfig;