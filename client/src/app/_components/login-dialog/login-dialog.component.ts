import { Component, EventEmitter, HostListener, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { LoginDialogOverlayRef } from './login-dialog-overlay-ref';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { AccountService } from 'src/app/_services/account.service';
import { ToastService } from 'src/app/_services/toast.service';
import { ToastData } from '../toast/toast-config';

const ESCAPE = String.fromCharCode(27);
const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
  animations:
  [
    trigger(
      'fade',
      [
        state('fadeOut', style({ opacity: 0 })),
        state('fadeIn',  style({ opacity: 1 })),
        // Think of * => * as a transition from one state to another state;
        // where * is a wildcard to mean any state value.
        transition('* => *', animate(ANIMATION_TIMINGS))
      ]
    ),
    trigger(
      'slide',
      [
        state('void', style({transform: 'translate3d(0,25%,0) scale(0.9)', opacity: 0})),
        state('enter', style({transform: 'none', opacity: 1})),
        state('leave', style({transform: 'translate3d(0,25%,0)', opacity: 0})),
        transition('* => *', animate(ANIMATION_TIMINGS))
      ]
    )
  ]
})

export class LoginDialogComponent implements OnInit{

  model: any = {};
  errorMessageSource = new ReplaySubject<string>(1);
  errorMessage$: Observable<string> = this.errorMessageSource;
  fadeState: 'fadeIn' | 'fadeOut' = 'fadeIn';
  slideState: 'void' | 'enter' | 'leave' = 'enter';
  animationStateChanged = new EventEmitter<AnimationEvent>();
  
  constructor(
    private loginDialogOverlayRef: LoginDialogOverlayRef,
    private accountService: AccountService,
    private toast: ToastService
  ){
    window.addEventListener('keydown', (event: KeyboardEvent) =>
    {
      if(event.key === 'Escape')
      {
        this.loginDialogOverlayRef.close();
      }
    })

  }

  ngOnInit(): void {
    this.fadeState='fadeIn';
    this.slideState='enter';
  }

  login()
  {
    this.accountService.login(this.model).subscribe(
      () => {
        this.loginDialogOverlayRef.close();
      },
      error => {
        const data = {text: error.error, type: 'warning' } as ToastData; 
        this.toast.displayToast(data)
      }
    );
    
  }

  cancel(): void {
    this.loginDialogOverlayRef.close();
  }

  onAnimationStart(event: AnimationEvent)
  {
    this.animationStateChanged.emit(event);
  }

  onAnimationDone(event: AnimationEvent)
  {
    this.animationStateChanged.emit(event);
  }

  startExitAnimation()
  {
    this.fadeState='fadeOut';
    this.slideState='leave';
  }
}
