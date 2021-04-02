import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCommentsByBlogPost(blogPostId: number)
  {
    return this.httpClient.get(environment.APIUrl + 'comments/' + blogPostId);
  }

  createNewComment(comment: Comment)
  {
    return this.httpClient.post(environment.APIUrl + 'comments/', comment);
  }

  deleteComment(commentId: number)
  {
    return this.httpClient.delete(environment.APIUrl + 'comments/delete' + commentId);
  }
}
