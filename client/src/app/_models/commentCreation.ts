import { InjectionToken } from "@angular/core";

export interface CommentCreation
{
    parentBlogPostId: number,
    parentCommentId?: number
}

export const CommentCreationToken = new InjectionToken<CommentCreation>('commentCreationToken');