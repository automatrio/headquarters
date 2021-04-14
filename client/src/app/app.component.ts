import { animateChild, query, transition, trigger } from '@angular/animations';
import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

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
    private router: Router
    ) {}

  ngOnInit(): void {
    this.setCurrentUser();
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