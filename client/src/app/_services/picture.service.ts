import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Picture } from '../_models/picture';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(private httpClient: HttpClient) { }

  uploadPicture(blogPostId: number, picture: FormData)
  {
    return this.httpClient.post(environment.APIUrl + 'picture/' + blogPostId, picture);
  }

  deletePicture(publicId: string)
  {
    return this.httpClient.delete(environment.APIUrl + 'picture/' + publicId);
  }
}
