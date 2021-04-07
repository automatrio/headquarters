import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Comment } from 'src/app/_models/comment';
import { CommentCreation, CommentCreationToken } from 'src/app/_models/commentCreation';
import { CommentsService } from 'src/app/_services/comments.service';
import { TIMING } from '../navpie/navpie.component';

@Component({
  selector: 'app-comment-creator',
  templateUrl: './comment-creator.component.html',
  styleUrls: ['./comment-creator.component.css'],
  animations: [
    trigger('scale', [
      transition(':enter', [
        style({ height: "0px" }),
        animate(TIMING, style({ height: "242px" }))
      ]),
      transition(':leave', [
        animate(TIMING, style({ height: "0px" }))
      ])
    ])
  ],
  
})
export class CommentCreatorComponent implements OnInit {

  newComment = new Comment();

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
      response => console.log(response)
    );
    this.quitCommentCreatorEvent.emit(true);
  }

  cancelCommentCreation()
  {
    // warn about data loss
    this.quitCommentCreatorEvent.emit(true);
  }

}
