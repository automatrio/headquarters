import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BlogPost } from '../_models/blogPost';
import { BlogPostEdit } from '../_models/blogPostEdit';
import { MediaService } from './media.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  blogPosts: BlogPost[] = []; // stores the currently loaded posts

  constructor(
    private httpClient: HttpClient,
    private mediaService: MediaService
    ) { }

  fetchBlogPosts(contentType: string) : Observable<BlogPost[]>
  {
    if(this.blogPosts[0]?.type == contentType)
    {
      // returns already loaded posts
      return of(this.blogPosts);
    }
    return this.httpClient.get<BlogPost[]>(environment.APIUrl + 'blogpost/type/' + contentType).pipe(
      map(posts => {
        this.blogPosts = posts;
        return posts as BlogPost[];
      })
    );
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
    return this.httpClient.put(environment.APIUrl + 'blogpost', content).pipe(
      map( () => {
        const index = this.blogPosts.findIndex(post => post.id == content.id);
        const editedPost = this.blogPosts[index];
        
        editedPost.id = content.id,
        editedPost.title = content.title,
        editedPost.content = content.content,
        editedPost.media = content.media
      })
    );
  }
}