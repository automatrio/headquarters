import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Comment } from 'src/app/_models/comment';
import { CommentCreation, CommentCreationToken } from 'src/app/_models/commentCreation';
import { CommentsService } from 'src/app/_services/comments.service';
import { TIMING } from '../navpie/navpie.component';

@Component({
  selector: 'app-comment-creator',
  templateUrl: './comment-creator.component.html',
  styleUrls: ['./comment-creator.component.css'],
  animations: [
  //   trigger('scale', [
  //     transition(':enter', [
  //       style({ height: "0px" }),
  //       animate(TIMING, style({ height: "242px" }))
  //     ]),
  //     transition(':leave', [
  //       animate(TIMING, style({ height: "0px" }))
  //     ])
  //   ])
  // ],
    trigger('scale', [
      transition('*=>*', [
        style({ height: "0px" }),,
        animate(TIMING, style({ height: "242px" }))
      ])
    ])
  ]
})
export class CommentCreatorComponent implements OnInit {

  newComment = new Comment();

  @ViewChild('cardRef', {read: ElementRef})
    cardRef: ElementRef;

  @Input()
    animationState: 'off' | 'on' = 'off';

  @Output()
    quitCommentCreatorEvent = new EventEmitter<boolean>();

  constructor(
    private commentsService: CommentsService,
    @Inject(CommentCreationToken) private commentCreation: CommentCreation)
  {
    this.newComment.parentBlogPostId = this.commentCreation.parentBlogPostId;
    this.newComment.parentCommentId = this.commentCreation.parentCommentId;
  }

  ngOnInit(): void {
  }

  submitNewComment()
  {
    this.commentsService.createNewComment(this.newComment).subscribe(
      response => {
        console.log("New commentDTO:", response)
        this.commentsService.commentCreated$.next(true);
      });
    this.quitCommentCreatorEvent.emit(true);
  }

  cancelCommentCreation()
  {
    // warn about data loss
    this.quitCommentCreatorEvent.emit(true);
  }

}
