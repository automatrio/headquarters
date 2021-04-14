import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TIMING } from 'src/app/_helpers/animations';
import { BlogPost } from 'src/app/_models/blogPost';

@Component({
  selector: 'app-button-cascade',
  templateUrl: './button-cascade.component.html',
  styleUrls: ['./button-cascade.component.css'],
  animations: [
    trigger('slide', [
      transition('*=>*', [
        query(':enter', [
          style({ transform: 'translateX(-400px)'}),
          stagger('0.5s', animate(TIMING, style({ transform: 'translateX(0px)' })))
        ], {optional: true})
      ]),
    ])
  ],

  
})
export class ButtonCascadeComponent implements OnInit {

  @Input()
    blogPosts: BlogPost[];

  @Output()
    indexChangeEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  changeIndex(event: Event)
  {
    const id = parseInt((event.currentTarget as HTMLButtonElement).value);
    this.indexChangeEvent.emit(id);
  }

}
