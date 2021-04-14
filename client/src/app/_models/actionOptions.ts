import { ContentType } from "../_helpers/contentType";
import { BlogPost } from "./blogPost";

export class ActionOptions
{
  action?: "create" | "edit" | "delete";
  type?: ContentType;
  element?: BlogPost;
}