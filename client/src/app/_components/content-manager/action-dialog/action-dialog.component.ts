import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { ContentType } from 'src/app/_helpers/contentType';
import { ActionOptions } from 'src/app/_models/actionOptions';
import { BlogPost } from 'src/app/_models/blogPost';
import { ContentService } from 'src/app/_services/content.service';
import { ACTION_CHOSEN_TOKEN, ACTION_STEP_TOKEN } from './action-dialog-config';

@Component({
  selector: 'app-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.css']
})
export class ActionDialogComponent implements OnInit {

  currentBlogPost: BlogPost;
  actionOptions: ActionOptions = {};
  private actionStepSource = new ReplaySubject<number>();
  actionStep: number;

  contentTypes: ContentType[] = [];
  blogPosts: BlogPost[] = [];

  @Output()
    finishedActionEvent = new EventEmitter<ActionOptions>();

  @Output()
    canceledActionEvent = new EventEmitter<boolean>();

  constructor(
    @Inject(ACTION_STEP_TOKEN) actionStep: number,
    @Inject(ACTION_CHOSEN_TOKEN) actionChosen: 'create' | 'edit' | 'delete',
    private contentService: ContentService)
  {
    this.actionOptions.action = actionChosen;
    this.actionStep = actionStep;
    
    this.contentTypes = this.getTypes();

    const subscription = this.actionStepSource.subscribe(
      (step: number) => {
        this.actionStep = step;

        if(step < 2) return;

        this.fetchElementsPerType(this.actionOptions.type);

        subscription.unsubscribe();
    });
  }

  ngOnInit(): void {

  }

  private getTypes()
  {
    const contentTypes: ContentType[] = [];

    for(let type in ContentType)
    {
      contentTypes.push((<any>type) as ContentType);
    }

    return contentTypes;
  }

  private createEmptyBlogPost(blogType: ContentType)
  {
    const emptyBlogPost = {
      title: "Choose a title",
      content: "Say something.",
      type: blogType,
      media: []
    } as BlogPost;

    return emptyBlogPost;
  }

  private fetchElementsPerType(contentType: ContentType)
  {
    const subscription = this.contentService.fetchBlogPosts(contentType.toString()).subscribe(
      (result) => {
        this.blogPosts = result;
        subscription.unsubscribe();
    });
  }

  private finish()
  {
    switch (this.actionOptions.action) {
      case "create":
      {
        this.actionOptions.element = this.createEmptyBlogPost(this.actionOptions.type);
        this.finishedActionEvent.emit(this.actionOptions);
        break;
      }
      case "edit":
      {
        this.finishedActionEvent.emit(this.actionOptions);
        break;
      }
      case "delete":
      {
        this.contentService.deleteBlogPost(this.actionOptions.element.id).subscribe();
        this.canceledActionEvent.emit(true);
        break;
      }
      default:
        break;
    }


  }

  onActionChosen(event: Event)
  {
    const actionChosen = (event.currentTarget as HTMLElement).id;

    switch (actionChosen) {
      case "create":
      {
        this.actionStepSource.next(1);
        this.actionOptions.action = "create";
        break;
      }
      case "edit":
      {
        this.actionStepSource.next(1);
        this.actionOptions.action = "edit";
        break;
      }
      case "delete":
      {
        this.actionStepSource.next(1);
        this.actionOptions.action = "delete";
        break;
      }
      default:
        break;
    }
  }

  onTypeChosen(event: Event)
  {
    const typeChosen = (event.currentTarget as HTMLElement).textContent;

    this.actionOptions.type = (<any>typeChosen) as ContentType;

    if(this.actionOptions.action == "create")
    {
      this.finish();
      return;
    }
    this.actionStepSource.next(2);
  }

  onElementChosen(event: Event)
  {
    const postChosen = parseInt((event.currentTarget as HTMLButtonElement).value);

    const selectedBlogPost = this.blogPosts.find(blogPost => {
      if(blogPost.id === postChosen) return blogPost; 
    });

    this.actionOptions.element = selectedBlogPost;

    this.finish();
  }

}
