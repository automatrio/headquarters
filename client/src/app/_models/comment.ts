export class Comment {
    id?: number;
    author: string;
    content: string;
    date?: Date;
    likesCount: number;
    parentBlogPostId: number;
    parentCommentId?: number;
}

export interface CommentNode {
    comment: Comment;
    children?: CommentNode[];
}

export interface FlatNode {
    expandable: boolean;
    comment: Comment;
    level: number;
}