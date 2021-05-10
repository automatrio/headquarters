import { animateChild, query, transition, trigger } from '@angular/animations';
import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Album } from './_models/album';
import { Music } from './_models/music';
import { Picture } from './_models/picture';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { MusicService } from './_services/music.service';
import { PlayerOverlayService } from './_services/player-overlay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slide', [
      transition(':enter, :leave', [
        query('@*', animateChild())
      ])
    ])
  ]
})

export class AppComponent {

  title: string = 'Automatrio Headquarters';
  isNavbar: boolean = true;

  animationEventSource = new Subject<AnimationEvent>();
  animationEvent$ = this.animationEventSource.asObservable();

  constructor(
    private accountService: AccountService,
    private router: Router,
    private playerOverlayService: PlayerOverlayService,
    private musicService: MusicService
    ) {}

  ngOnInit(): void {
    this.setCurrentUser();

    // temporary
    // const music = [] as Music[];
    // music.push({
    //   number: 1,
    //   title: 'CrazyTrack001',
    //   duration: 700
    // } as Music);
    // music.push({
    //   number: 2,
    //   title: 'CrazyTrack002',
    //   duration: 400
    // } as Music);
    // music.push({
    //   number: 3,
    //   title: 'CrazyTrack003',
    //   duration: 340
    // } as Music);
    // music.push({
    //   number: 4,
    //   title: 'CrazyTrack004',
    //   duration: 1200
    // } as Music);
    // music.push({
    //   number: 5,
    //   title: 'CrazyTrack005',
    //   duration: 1500
    // } as Music);

    // const albumCover = {
    //   url: 'https://res.cloudinary.com/automatrio/image/upload/v1617825548/headquarters/Logo01_glw9v3.png'
    // } as Picture;
    
    // this.playerOverlayService.openPlayer(new Album("MyAlbm", albumCover, music));

    // choose a random album or the latest one
    this.musicService.getAllAlbums().subscribe(
      (response: Album[]) => {
        try
        {
          const latestAlbum = response[response.length - 1];
          this.playerOverlayService.openPlayer(latestAlbum);
        }
        catch
        {
          throw("Failed to fetch music.");
        }
      }
    );
  }

  setCurrentUser()
  {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

  async switchNavMenus(event: string)
  {
    const thing = await this.router.navigateByUrl(event).finally( () => this.isNavbar = false );
  }

  onSlideAnimationDone(event: AnimationEvent)
  {
    this.animationEventSource.next(event);
  }
}