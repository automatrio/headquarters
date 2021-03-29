import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogPost } from 'src/app/_models/blogPost';
import { Content } from 'src/app/_models/content';
import { Media } from 'src/app/_models/media';
import { ContentService } from 'src/app/_services/content.service';
import { MediaService } from 'src/app/_services/media.service';
import { NavpieOverlayService } from 'src/app/_services/navpie-overlay.service';

const ANIMATION_TIMINGS = '1000ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
  selector: 'app-content-viewer',
  templateUrl: './content-viewer.component.html',
  styleUrls: ['./content-viewer.component.css']
})
export class ContentViewerComponent implements OnInit, AfterViewInit {
 
  blogPosts: BlogPost[] = [];
  index: number = 0;

  @Input()
  contentType: "MusicBlog" | "DevLog" | "Model3DBlog" | "NewsBlog" | "PictureBlog";

  @Input()
    isHomepage: boolean = true;

  constructor(
    private contentService: ContentService,
    private navpieOverlayService: NavpieOverlayService
    ) { 
    console.log("Content viewer starting")
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.fetchContent(this.contentType);
    this.setHomepageContentViewer();
  }

  fetchContent(contentType: "MusicBlog" | "DevLog" | "Model3DBlog" | "NewsBlog" | "PictureBlog")
  {
    this.contentService.fetchBlogPosts(contentType).subscribe(
      response => this.blogPosts = response
    )
  }

  setHomepageContentViewer()
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
      this.sleep(1000).then( () => {
  
        const drawer = document.getElementsByClassName("mat-drawer")[0] as HTMLElement;
        const sideNav = document.getElementsByClassName("sidenav-container")[0] as HTMLElement;
        // drawer.style.top = "150px";
        

        const finishedAnimationPromise = sideNav.animate([{
          transform: "translateY(-150px)"
        }], {duration: 1000, easing: "cubic-bezier(0.25, 0.8, 0.25, 1)"}).finished;

        from(finishedAnimationPromise).subscribe(
          () => {
            sideNav.style.top = "0px";
            drawer.style.position = "fixed";
          });

        });

    }
  }

  changeIndex(event: Event)
  {
    const element = event.target as HTMLElement;
    this.index = parseInt(element.id);
  }

  sleep(length)
  {
    return new Promise(resolve => setTimeout(resolve, length));
  }

  displayNavpie()
  {
    this.navpieOverlayService.open();
  }

}
