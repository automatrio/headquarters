import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/_models/album';
import { Music } from 'src/app/_models/music';
import { MusicDataTransfer } from 'src/app/_models/musicDataTransfer';
import { Picture } from 'src/app/_models/picture';
import { MusicService } from 'src/app/_services/music.service';
import { PictureDialogComponent } from '../picture-dialog/picture-dialog.component';

@Component({
  selector: 'app-music-dialog',
  templateUrl: './music-dialog.component.html',
  styleUrls: ['./music-dialog.component.css']
})
export class MusicDialogComponent implements OnInit {

  files: FileList;
  musicInfo: Music = {
    title:'test',
    duration:177,
    number: 1,
    album: 'testRestLetsFest',
    type: 'music'
  }; // get data from forms

  album: Album = new Album('test', {} as Picture, [] as Music[]);

  constructor(
    public dialogRef: MatDialogRef<PictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private blogPostId: number,
    private musicService: MusicService) { }

  ngOnInit(): void {
  }

  onCancel()
  {
    this.dialogRef.close();
  }

  loadDroppedFiles(files: FileList)
  {
    this.files = files;
    this.uploadFiles(files, () => this.chooseAlbum());
  }

  fileBrowseHandler(event: Event)
  {

  }

  uploadFiles(files: FileList, next: any)
  {
    let picturesUploaded: Subscription;

    Array.from(files).forEach(file =>
    {
      const formData = new FormData();

      formData.append('file', file, file.name);

      const dataTransfer = {
        file: formData,
        music: this.musicInfo
      } as MusicDataTransfer;

      this.musicService.addMusicToAlbum(dataTransfer).subscribe(
        (response: Music[]) => {
          this.album.music = response;
        }
      );

    });

    picturesUploaded?.add(next).unsubscribe();
  }

  chooseAlbum()
  {

  }

}
