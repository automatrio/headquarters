import { Media } from "./media";

export interface BlogPostEdit
{
    id: number,
    title: string,
    content: string,
    media: Media[]
}