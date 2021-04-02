import { BlogPost } from "./blogPost";

export class ManagerOptions
{
  action: string;
  title?: string;
  type: string;
  blogPost?: BlogPost;
  content?: string;
}