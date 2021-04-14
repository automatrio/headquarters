import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Comment } from '../_models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  commentCreated$ = new Subject<boolean>();

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

  likeComment(commentId: number)
  {
    return this.httpClient.post(environment.APIUrl + 'comments/like/' + commentId, {});
  }
}
