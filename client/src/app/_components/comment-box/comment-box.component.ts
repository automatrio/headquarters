
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Comment } from 'src/app/_models/comment';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements AfterViewInit {

  isChild: boolean = false;
  padding: number = 20;

  @ViewChild("cardRef", {read: ElementRef})
    cardRef: ElementRef;

  constructor(
    @Inject(Comment) public comment: Comment
  ) {}

  ngAfterViewInit(): void {
    (this.cardRef.nativeElement as HTMLElement).style.marginLeft = (`${(Number(this.isChild) * this.padding)}` + "px");
  }

}
