import { ContentType } from "../_helpers/contentType";
import { Media } from "./media";

export interface BlogPost
{
    id: number,
    type: ContentType,
    title: string,
    content: string,
    media: Media[]
}