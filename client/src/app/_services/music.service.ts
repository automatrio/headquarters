import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MusicDataTransfer } from '../_models/musicDataTransfer';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  baseUrl = environment.APIUrl + 'music/';

  constructor(private httpClient: HttpClient) { }

  getAllAlbums()
  {
    return this.httpClient.get(this.baseUrl + 'all');
  }

  getAlbumById(id: number)
  {
    return this.httpClient.get(this.baseUrl + 'id/' + id);
  }

  getAlbumByTitle(title: string)
  {
    return this.httpClient.get(this.baseUrl + 'title/' + title);
  }

  addMusicToAlbum(data: MusicDataTransfer)
  {
    return this.httpClient.post(this.baseUrl + 'add', data);
  }

  deleteAlbum()
  {
    // Yet to implement
  }

  deleteMusicFromAlbum()
  {
    // Yet to implement
  }

}
