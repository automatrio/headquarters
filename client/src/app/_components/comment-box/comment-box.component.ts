import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild, ViewContainerRef, ViewRef } from '@angular/core';
import { Comment } from 'src/app/_models/comment';
import { CommentCreation } from 'src/app/_models/commentCreation';
import { CommentCreatorService } from 'src/app/_services/comment-creator.service';
import { CommentsService } from 'src/app/_services/comments.service';
import { CommentCreatorRef } from '../comment-creator/comment-creator-ref';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit, AfterViewInit {

  isChild: boolean = false;
  padding: number = 20;
  hasLikedThisComment: boolean;
  likeIcons: string[] = ["thumb_up", "favorite"];
  likeIcon: string;

  @ViewChild("cardRef", {read: ElementRef})
    cardRef: ElementRef;

  @ViewChild("container", {read: ViewContainerRef})
    container: ViewContainerRef;

  @Output()
    replyQueuedEvent = new EventEmitter<number>();

  constructor(
    @Inject(Comment) public comment: Comment,
    private commentsService: CommentsService,
    private commentCreatorService: CommentCreatorService
  ) {}


  ngOnInit(): void {
    this.hasLikedThisComment = (localStorage.getItem("CommentId_" + this.comment.id) == "true");
    this.likeIcon = this.hasLikedThisComment? this.likeIcons[1] : this.likeIcons[0];
  }

  ngAfterViewInit(): void {
    (this.cardRef.nativeElement as HTMLElement).style.marginLeft = (`${(Number(this.isChild) * this.padding)}` + "px");
  }

  likeComment()
  {
    this.commentsService.likeComment(this.comment.id).subscribe(
      (newLikesCount: number) => {
        this.comment.likesCount = newLikesCount;
        this.hasLikedThisComment = true;
        localStorage.setItem("CommentId_" + this.comment.id, this.hasLikedThisComment.toString());
        this.likeIcon = this.likeIcons[1];
      }
    );
  }

  replyComment()
  {
    console.log("emitting reply request")
    this.replyQueuedEvent.emit(this.comment.id);
  }

  callCommentCreator() : CommentCreatorRef
  {
    console.log("creating comment-creator component")

    const commentCreation = {
      parentBlogPostId: this.comment.parentBlogPostId,
      parentCommentId: this.comment.id
    } as CommentCreation;
    const creatorRef = this.commentCreatorService.displayCreator(commentCreation);
    
    this.container.insert(creatorRef.hostView);

    return creatorRef;
  }

}
