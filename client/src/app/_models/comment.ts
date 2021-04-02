export interface Comment {
    id?: number;
    author: string;
    content: string;
    date?: Date;
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