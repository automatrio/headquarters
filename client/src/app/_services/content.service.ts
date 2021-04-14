import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogPost } from '../_models/blogPost';
import { BlogPostEdit } from '../_models/blogPostEdit';
import { MediaService } from './media.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(
    private httpClient: HttpClient,
    private mediaService: MediaService
    ) { }

  fetchBlogPosts(contentType: string) : Observable<BlogPost[]>
  {
    return this.httpClient.get<BlogPost[]>(environment.APIUrl + 'blogpost/type/' + contentType);
  }

  fetchMediaForEachBlog(blogs: BlogPost[])
  {
    // questionable
  }

  postNewContent(content: BlogPost)
  {
    return this.httpClient.post<BlogPost>(environment.APIUrl + 'blogpost', content);
  }
  
  deleteBlogPost(blogPostId: number)
  {
    return this.httpClient.delete(environment.APIUrl + 'blogpost/delete/' + blogPostId);
  }

  updateBlogPost(content: BlogPostEdit)
  {
    return this.httpClient.put(environment.APIUrl + 'blogpost', content);
  }
}