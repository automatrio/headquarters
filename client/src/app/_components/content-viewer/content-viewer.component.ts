import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { AfterViewChecked, AfterViewInit, Component, ComponentRef, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { from, Observable } from 'rxjs';
import { BlogPost } from 'src/app/_models/blogPost';
import { Comment, CommentNode } from 'src/app/_models/comment';
import { CommentsService } from 'src/app/_services/comments.service';
import { ContentService } from 'src/app/_services/content.service';
import { NavpieOverlayService } from 'src/app/_services/navpie-overlay.service';
import { CommentTreeComponent } from '../comment-tree/comment-tree.component';

const ANIMATION_TIMINGS = '1000ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
  selector: 'app-content-viewer',
  templateUrl: './content-viewer.component.html',
  styleUrls: ['./content-viewer.component.css']
})
export class ContentViewerComponent implements OnInit, AfterViewInit, AfterViewChecked {
 
  blogPosts: BlogPost[] = [];
  isParentReady: boolean = false;
  
  index: number = 0;
  buttons: Observable<HTMLElement[]>;

  @Input()
  contentType: "MusicBlog" | "Devlog" | "Model3DBlog" | "NewsBlog" | "PictureBlog";

  @Input()
    isHomepage: boolean = true;

  @ViewChild(CommentTreeComponent)
    commentTree: CommentTreeComponent;

  constructor(
    private contentService: ContentService,
    private navpieOverlayService: NavpieOverlayService
    )
  { 
  }
  ngAfterViewChecked(): void {
    this.generateContentButtons();
    
  }

  ngAfterViewInit(): void {
    const commentsObtained = this.fetchContent(this.contentType);
    commentsObtained;
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
        contentFetched.unsubscribe();
      });
  }

  async setHomepageContentViewer()
  {
    if(this.isHomepage)
    {
      const drawer = document.getElementsByClassName("mat-drawer")[0] as HTMLElement;
      // drawer.style.top = "150px";
      drawer.style.position = "absolute";

      const sideNav = document.getElementsByClassName("sidenav-container")[0] as HTMLElement;
      sideNav.style.top = "150px";
    }
    else
    {
      await this.sleep(200).then( () => {
  
        const drawer = document.getElementsByClassName("mat-drawer")[0] as HTMLElement;
        const sideNav = document.getElementsByClassName("sidenav-container")[0] as HTMLElement;
        // drawer.style.top = "150px";
        

        const finishedAnimationPromise = sideNav.animate([{
          transform: "translateY(-150px)"
        }], {duration: 1000, easing: "cubic-bezier(0.25, 0.8, 0.25, 1)"}).finished;

        const finishedAnimationObservable = from(finishedAnimationPromise).subscribe(
          () => {
            sideNav.style.top = "0px";
            drawer.style.position = "fixed";
            finishedAnimationObservable.unsubscribe();
          });

        });

    }
  }

  changeIndex(event: Event)
  {
    const element = event.target as HTMLElement;
    this.index = parseInt(element.id);
    this.commentTree.reset();
  }

  sleep(length)
  {
    return new Promise(resolve => setTimeout(resolve, length));
  }

  displayNavpie()
  {
    this.navpieOverlayService.open();
  }

  async generateContentButtons()
  {
    const buttons = document.getElementsByClassName('content-button');
    
    for (let i = 0; i < buttons.length; i++)
    {
      const currentButton = buttons[i] as HTMLElement;

      await this.sleep(200).then( () =>
      {
        const finishedAnimationPromise = currentButton?.animate({
          opacity: 1,
          transform: 'translateX(0px)'
        }, {duration: 600, easing: "cubic-bezier(0.25, 0.8, 0.25, 1)"}).finished;

        const finishedAnimationObservable = from(finishedAnimationPromise).subscribe(
          () => {
            currentButton.style.opacity = "1";
            currentButton.style.transform = 'translateX(0px)';
            finishedAnimationObservable.unsubscribe();
        });
      });

    }
  }
}
