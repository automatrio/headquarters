import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogPost } from '../_models/blogPost';
import { MediaService } from './media.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(
    private httpClient: HttpClient,
    private mediaService: MediaService
    ) { }

  fetchBlogPosts(contentType: 'MusicBlog' | 'DevLog' | 'Model3DBlog' | 'NewsBlog' | 'PictureBlog') : Observable<BlogPost[]>
  {
    return this.httpClient.get<BlogPost[]>(environment.APIUrl + 'blogpost/type/' + contentType);
  }

  fetchMediaForEachBlog(blogs: BlogPost[])
  {

  }

}