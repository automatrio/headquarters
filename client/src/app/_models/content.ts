import { Comment } from "./comment";

export interface Content
{
    type: string;
    title: string;
    text: string;
    comments: Comment[];
    date: Date;
}