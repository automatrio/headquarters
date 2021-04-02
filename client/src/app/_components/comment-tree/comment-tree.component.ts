import { AfterViewInit, Component, ComponentFactoryResolver, Injector, Input, OnInit, ViewChild, ViewContainerRef, ViewRef } from '@angular/core';
import { BlogPost } from 'src/app/_models/blogPost';
import { Comment, CommentNode } from 'src/app/_models/comment';
import { CommentsService } from 'src/app/_services/comments.service';
import { CommentBoxComponent } from '../comment-box/comment-box.component';

@Component({
  selector: 'app-comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.css']
})
export class CommentTreeComponent implements OnInit, AfterViewInit {

  comments: Comment[] = [];

  @Input()
    blogPost: BlogPost;

  @ViewChild("container", {read: ViewContainerRef})
    container: ViewContainerRef;

  constructor(
    private commentsService: CommentsService,
    private factoryResolver: ComponentFactoryResolver,
    private injector: Injector
    ) {}
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    this.fetchComments();
  }

  private fetchComments()
  {
    const fetchComments = this.commentsService.getCommentsByBlogPost(this.blogPost.id).subscribe(
      (response: Comment[]) => {
        this.comments = response;
        this.reorganizeCommentsIntoTree(this.comments);
        this.createBoxesForAllComments(this.comments);
        fetchComments.unsubscribe();
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

  private createCommentBox(commentInject: Comment, viewContainerRef: ViewContainerRef, isChild: boolean) : ViewRef
  {
    const componentFactory = this.factoryResolver.resolveComponentFactory(CommentBoxComponent);

    const injector = Injector.create({
      providers:
      [
        {provide: Comment, useValue: commentInject}
      ]
    });

    const componentRef = viewContainerRef.createComponent(componentFactory, 0, injector);

    componentRef.instance.isChild = isChild;

    return componentRef.hostView;
  }

  private createBoxesForAllComments(comments: Comment[]) : void
  {
    comments.forEach(
      comment => {
        this.createCommentBox(comment, 
          this.container,
          (!!comment.parentCommentId))
      }
    );
  }

  reset()
  {
    this.comments = [];
    this.fetchComments();
  }

}
