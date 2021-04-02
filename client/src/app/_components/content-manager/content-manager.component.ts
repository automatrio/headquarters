import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogPost } from 'src/app/_models/blogPost';
import { ManagerOptions } from 'src/app/_models/managerOptions';
import { Media } from 'src/app/_models/media';
import { ContentService } from 'src/app/_services/content.service';
import { MediaService } from 'src/app/_services/media.service';

@Component({
  selector: 'app-content-manager',
  templateUrl: './content-manager.component.html',
  styleUrls: ['./content-manager.component.css']
})
export class ContentManagerComponent implements OnInit {

  actionValue: string = "create";
  contentTypeValue: string;
  elementValue: BlogPost | "choose content type";
  managerOptions: ManagerOptions = {action: "create", type:"MusicBlog", blogPost:({title: "New BlogPost", content:"Say something"} as BlogPost)};

  contentTypes = ["MusicBlog", "Devlog", "Model3DBlog", "NewsBlog", "PictureBlog"];
  elements: BlogPost[] = [this.managerOptions.blogPost];

  constructor(
    private contentService: ContentService,
    private mediaService: MediaService)
    {}

  ngOnInit(): void {
  }

  fetchElements(contentType)
  {
    console.log("fetching elements")
    this.contentService.fetchBlogPosts(contentType).pipe(
      map(
        response => this.elements = response
      )
    );
  }

  contentTypeChosen(event: 'MusicBlog' | 'Devlog' | 'Model3DBlog' | 'NewsBlog' | 'PictureBlog')
  {
    if(this.actionValue == "edit")
    {
      this.contentService.fetchBlogPosts(event).subscribe(
        (response: BlogPost[]) => this.elements = response
      );
    }

  }

  actionChosen(event)
  {
    this.actionValue = event;
    this.elements = [];
    this.elements.push({title: "New BlogPost"} as BlogPost);
  }

  elementChosen(event: Event)
  {
    // console.log(event)
    return;
  }

  go()
  {
    console.log(this.actionValue + " is the way.");
    switch (this.actionValue) {
      case "create":
      {
        const newMedia: Media[] = [];
        const newPost = {
          title: this.managerOptions.title,
          content: this.managerOptions.content,
          type: this.managerOptions.type,
          media: newMedia
        } as BlogPost;

        this.contentService.postNewContent(newPost).subscribe(
          response => console.log(response)
        );
        break;
      }
      default:
        break;
    }
  }
}

