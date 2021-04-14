import { animateChild, query, transition, trigger } from '@angular/animations';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { from, Observable, Subject } from 'rxjs';
import { BlogPost } from 'src/app/_models/blogPost';
import { CommentCreation } from 'src/app/_models/commentCreation';
import { CommentCreatorService } from 'src/app/_services/comment-creator.service';
import { ContentService } from 'src/app/_services/content.service';
import { NavpieOverlayService } from 'src/app/_services/navpie-overlay.service';
import { CommentTreeComponent } from '../comment-tree/comment-tree.component';

const ANIMATION_TIMINGS = '1000ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
  selector: 'app-content-viewer',
  templateUrl: './content-viewer.component.html',
  styleUrls: ['./content-viewer.component.css'],
  animations: [
    trigger('scale', [
      transition(':enter, :leave', [
        query('@*', animateChild())
      ])
    ])
  ]
})
export class ContentViewerComponent implements OnInit, AfterViewInit, AfterViewChecked {
 
  blogPosts: BlogPost[] = [];
  isReady: boolean = false;
  isParentReady: boolean = false;
  
  index: number = 0;
  buttons: Observable<HTMLElement[]>;

  hasComments$ = new Subject<boolean>();

  @Input()
    contentType: "MusicBlog" | "Devlog" | "Model3DBlog" | "NewsBlog" | "PictureBlog";

  @Input()
    isHomepage: boolean = true;

  @ViewChild(MatSidenav)
    sidenavDrawer: MatSidenav;

  @ViewChild(CommentTreeComponent)
    commentTree: CommentTreeComponent;

  @ViewChild("commentsViewport", {read: ElementRef})
    commentsViewport: ElementRef;

  @ViewChild("container" , {read: ViewContainerRef})
    container: ViewContainerRef;

  constructor(
    private contentService: ContentService,
    private navpieOverlayService: NavpieOverlayService,
    private commentCreatorService: CommentCreatorService
    )
  {}


  ngAfterViewChecked(): void {
    // this.generateContentButtons();
  }

  ngAfterViewInit(): void {
    this.fetchContent(this.contentType);
  }

  ngOnInit(): void {
    this.setHomepageContentViewer();
  }

  fetchContent(contentType: "MusicBlog" | "Devlog" | "Model3DBlog" | "NewsBlog" | "PictureBlog")
  {
    const contentFetched = this.contentService.fetchBlogPosts(contentType).subscribe(
      response =>
      {
        this.blogPosts = response;
        this.isParentReady = true;
        this.isReady = true;
        contentFetched.unsubscribe();
      });
  }

  private async setHomepageContentViewer()
  {

    // let elements = [];

    // elements[0] = document.getElementsByClassName("text-container")[0] as HTMLElement;
    // elements[1] = document.getElementsByClassName("sidenav-container")[0] as HTMLElement;

    // if(this.isHomepage)
    // {
    //   elements[1].style.position = "absolute";

    //   elements.forEach( (element: HTMLElement) => {
    //     element.style.top = "150px";
    //   });
    // }
    // else
    // {
    //   await this.sleep(200).then( () => {
        
    //     let finishedAnimationPromise = [];

    //     elements.forEach((element: HTMLElement) => {
    //       this.animateElements(element);
    //     });

    //     elements[1].style.position = "fixed";

    //   });
    // }
  }

  private animateElements(element: HTMLElement)
  {
    const finishedAnimationPromise = element.animate([{
      transform: "translateY(-150px)"
    }], {duration: 1000, easing: "cubic-bezier(0.25, 0.8, 0.25, 1)"}).finished;

    const subscription = from(finishedAnimationPromise).subscribe( () => {
      element.style.top = "-150px";
      subscription.unsubscribe();
    });

  }

  onIndexChange(event: number)
  {
    const currentBlogIndex = this.blogPosts.findIndex(blogPost => {
      if(blogPost.id == event)
      {
        return blogPost;
      }
    });

    this.index = currentBlogIndex;
    
    this.sidenavDrawer.opened = false;
    this.commentTree.reset();
  }

  displayNavpie()
  {
    this.navpieOverlayService.open();
  }

  private checkForComments(event: boolean)
  {
    const commentsViewport = (this.commentsViewport.nativeElement as HTMLElement);

    if(event == false)
    {
      commentsViewport.style.display = "none";
      return;
    }
    commentsViewport.style.display = "flex";
  }

  leaveComment()
  {
    const commentCreation = {
      parentBlogPostId: this.blogPosts[this.index].id,
      parentComment: null
    } as CommentCreation;

    const commentCreatorRef = this.commentCreatorService.displayCreator(commentCreation);
    this.container.insert(commentCreatorRef.hostView);
  }

  callSidenav()
  {
    this.sidenavDrawer.opened = true;
  }
}
