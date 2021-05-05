import { animate, animation, query, stagger, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TIMING } from 'src/app/_helpers/animations';
import { Album } from 'src/app/_models/album';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  animations: [
    trigger('toggleCollapse', [
      transition('*=>*', [
        query(':enter', [
          style({ transform: 'scaleY(0)'}),
          stagger('0.2s', animate(TIMING, style({ transform: 'scaleY(1)' })))
        ])
      ]),
    ])
  ],
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements AfterViewInit {

  album: Album;
  isCollapsed: boolean = true;
  displayedColumns: string[] = ['number', 'title', 'duration', 'play', 'add'];
  dataSource: any;

  @ViewChild('albumCover', {read: ElementRef})
    albumCover: ElementRef;


  constructor(currentAlbum: Album) {
    this.album = currentAlbum;
    this.dataSource = this.album;
  }

  ngAfterViewInit(): void
  {
    if(!this.isCollapsed)
    {
      (this.albumCover.nativeElement as HTMLImageElement).src = this.album.picture.url;
    }
  }

  toggleCollapse()
  {
    this.isCollapsed = !this.isCollapsed;
  }

  play()
  {

  }

  pause()
  {

  }

  stop()
  {
    
  }
  

}
