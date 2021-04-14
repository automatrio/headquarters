import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Injector, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlogPost } from 'src/app/_models/blogPost';
import { Comment } from 'src/app/_models/comment';
import { CommentsService } from 'src/app/_services/comments.service';
import { CommentBoxComponent } from '../comment-box/comment-box.component';

@Component({
  selector: 'app-comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.css']
})
export class CommentTreeComponent implements OnInit, AfterViewInit, OnDestroy {

  comments: Comment[] = [];
  commentCreationSubscription: Subscription;

  @Input()
    blogPost: BlogPost;

  @Output()
    hasComments = new EventEmitter<boolean>();

  @ViewChild('container', {read: ViewContainerRef})
    container: ViewContainerRef;

  containerChildren: CommentBoxComponent[] = [];


  constructor(
    private commentsService: CommentsService,
    private factoryResolver: ComponentFactoryResolver,
    private router: Router)
    {
      this.router.onSameUrlNavigation = 'reload';
    }

  ngOnDestroy(): void {
    this.commentCreationSubscription?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.fetchComments();
    this.commentCreationSubscription = this.commentsService.commentCreated$.subscribe(
      () => {
        this.reset();
    });
  }

  ngOnInit(): void {

  }

  private fetchComments()
  {
    const fetchComments = this.commentsService.getCommentsByBlogPost(this.blogPost?.id).subscribe(
      (response: Comment[]) => {

        if(response.length > 0)
        {
          this.comments = response;
          this.reorganizeCommentsIntoTree(this.comments);
          this.createBoxesForAllComments(this.comments);
          fetchComments.unsubscribe();
          
          this.hasComments.emit(true);
        }
        else
        {
          this.hasComments.emit(false);
        }

      }
    );
  }

  private reorganizeCommentsIntoTree(comments: Comment[]) : Comment[]
  {
    let reorganizedNodes: Comment[] = [];

    comments.forEach(comment => {
      if(comment.parentBlogPostId == null)
      {
        reorganizedNodes.push(comment);
      }
    })

    comments.forEach(childComment => {
      if(childComment.parentBlogPostId != null)
      {
        const parentCommentIndex: number = reorganizedNodes.findIndex(parent => parent.id == childComment.parentCommentId);
        reorganizedNodes = reorganizedNodes.splice(parentCommentIndex, 0, childComment);
      }
    })

    return reorganizedNodes;
  }

  private createCommentBox(commentInject: Comment, viewContainerRef: ViewContainerRef, isChild: boolean) : ComponentRef<CommentBoxComponent>
  {
    const componentFactory = this.factoryResolver.resolveComponentFactory(CommentBoxComponent);

    const injector = Injector.create({
      providers:
      [
        {provide: Comment, useValue: commentInject}
      ]
    });

    // const componentRef = viewContainerRef.createComponent(componentFactory, 0, injector);

    const componentRef = componentFactory.create(injector);

    componentRef.instance.isChild = isChild;

    componentRef.instance.replyQueuedEvent.subscribe(
      (parentCommentId: number) =>
      {
        console.log("subscription successful")
        this.pushCommentBoxesDown(parentCommentId);
      }
    );

    return componentRef;
  }

  private createBoxesForAllComments(comments: Comment[]) : void
  {
    comments.forEach(
      comment => {
        const commentRef = this.createCommentBox(comment, 
          this.container,
          (!!comment.parentCommentId));

        this.container.insert(commentRef.hostView);
        this.containerChildren.push(commentRef.instance);
      }
    );
  }

  reset() {
    this.container.clear();
    this.comments = [];
    this.ngAfterViewInit();
  }

  pushCommentBoxesDown(parentCommentId: number)
  {
    const index = this.comments.findIndex(comment => comment.id == parentCommentId);

    const commentCreatorRef = this.containerChildren[index].callCommentCreator();

    commentCreatorRef.changeAnimationState('on');
  }

}
