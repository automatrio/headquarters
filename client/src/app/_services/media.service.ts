import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private httpClient: HttpClient) { }

  fetchContent(contentType: string)
  {
    return this.httpClient.get(environment.APIUrl + 'media/' + contentType);
  }
}
