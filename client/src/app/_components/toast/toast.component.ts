import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { ToastConfig, ToastData, ToastType, TOAST_CONFIG_TOKEN } from './toast-config';
import { ToastRef } from './toast-ref';

const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations:
  [
    trigger(
      'fade',
      [
        state('fadeOut', style({ opacity: 0 })),
        state('fadeIn',  style({ opacity: 1 })),
        transition('* => *', animate(ANIMATION_TIMINGS))
      ]
    ),
    trigger(
      'slide',
      [
        state('void', style({transform: 'translateY(200px) scale(0.9)', opacity: 0})),
        state('enter', style({transform: 'none', opacity: 1})),
        state('leave', style({transform: 'translateY(200px)', opacity: 0})),
        transition('* => *', animate(ANIMATION_TIMINGS))
      ]
    )
  ]
})

export class ToastComponent implements OnInit {

  iconType: string = 'success';
  style: string;
  fadeState: 'fadeIn' | 'fadeOut' = 'fadeOut';
  slideState: 'void' | 'enter' | 'leave' = 'enter';
  animationStateChanged = new EventEmitter<AnimationEvent>();

  constructor(
    public readonly data: ToastData,
    public readonly ref: ToastRef,
    @Inject(TOAST_CONFIG_TOKEN) private toastConfig: ToastConfig
  ) {}

  ngOnInit(): void {
    this.fadeState = 'fadeIn';
  }

  close()
  {
    this.ref.close();
  }

  configureStyle(): string
  {
    this.iconType = this.data.type === 'success'? 'done' : this.data.type;

    switch(this.data.type)
    {
      case('warning'):
        return 'rgba(255,0,80,.5)';
      case('success'):
        return 'rgba(0,255,80,.5)';
      default:
        return 'rgba(0,80,255,.5)';
    }
  }

  onAnimationStarted(event: AnimationEvent)
  {
    this.animationStateChanged.emit(event);
  }

  onAnimationEnded(event: AnimationEvent)
  {
    this.animationStateChanged.emit(event);
  }

  startExitAnimation()
  {
    this.fadeState = 'fadeOut';
    this.slideState = 'leave';
  }

}
