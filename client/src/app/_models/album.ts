import { Music } from "./music";
import { Picture } from "./picture";

export class Album
{
    title: string;
    picture : Picture;
    music: Music[] = [];

    constructor(title: string, picture: Picture, music: Music[])
    {
        this.title = title;
        this.picture = picture;
        this.music = music;
    }
}