import { Media } from "./media";

export interface BlogPost
{
    id: number,
    type: string,
    title: string,
    content: string,
    media: Media[]
}