import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Navigation, Router } from '@angular/router';
import { ActionOptions } from 'src/app/_models/actionOptions';
import { BlogPost } from 'src/app/_models/blogPost';
import { BlogPostEdit } from 'src/app/_models/blogPostEdit';
import { HyperlinkModel } from 'src/app/_models/hyperlinkModel';
import { Media } from 'src/app/_models/media';
import { Picture } from 'src/app/_models/picture';
import { ActionOverlayService } from 'src/app/_services/action-overlay.service';
import { ContentService } from 'src/app/_services/content.service';
import { PictureService } from 'src/app/_services/picture.service';
import { defaultActionDialogConfig } from './action-dialog/action-dialog-config';
import { HyperlinkDialogComponent } from './hyperlink-dialog/hyperlink-dialog.component';
import { PictureDialogComponent } from './picture-dialog/picture-dialog.component';

@Component({
  selector: 'app-content-manager',
  templateUrl: './content-manager.component.html',
  styleUrls: ['./content-manager.component.css']
})
export class ContentManagerComponent implements OnInit {

  navigation: Navigation;
  postModel: BlogPost;
  mediaToUpload: Media[] = [];
  actionChosen: 'create' | 'edit' | 'delete';
  currentStep: number = 0;

  @ViewChild('textRef', {read: ElementRef})
    textRef: ElementRef;

  @ViewChild('managerForm')
    managerForm: NgForm;

  @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: Event)
    {
      if(this.managerForm.dirty)
      {
        $event.returnValue = true;
      }
    }

  constructor(
    private actionOverlayService: ActionOverlayService,
    private contentService: ContentService,
    private pictureService: PictureService,
    private matDialog: MatDialog,
    private router: Router)
  {
    this.navigation = this.router.getCurrentNavigation();
  }

  ngOnInit(): void {
    const actionOverlayRef = this.actionOverlayService.callActionOverlay(defaultActionDialogConfig, this.currentStep, this.actionChosen);
    const subscription = actionOverlayRef.component.finishedActionEvent.subscribe(
      (response: ActionOptions) => {
        this.postModel = response.element;
        this.actionChosen = response.action;
        actionOverlayRef.close();
        subscription.unsubscribe();
    });
  }


  UI_returnToPreviousRoute()
  {
    this.router.navigateByUrl(this.navigation.initialUrl, {skipLocationChange: false});
  }

  action_createPost()
  {
    this.currentStep = 1;
    this.actionChosen = 'create';
    this.ngOnInit();
  }

  action_editPost()
  {
    this.currentStep = 1;
    this.actionChosen = 'edit';
    this.ngOnInit();
  }

  action_deletePost()
  {
    this.currentStep = 1;
    this.actionChosen = 'delete';
    this.ngOnInit();
  }

  manage_publish()
  {
    switch(this.actionChosen) {
      case 'create':
      {
        console.log("creating new blog post");
        this.contentService.postNewContent(this.postModel).subscribe(
          response => console.log(response)
        );
        break;
      }
      case 'edit':
      {
        const edit = {
          id: this.postModel.id,
          title: this.postModel.title,
          content: this.postModel.content,
          media: this.postModel.media
        } as BlogPostEdit;
        this.contentService.updateBlogPost(edit).subscribe(
          response => console.log(response)
        );
        break;
      }
      default:
        break;
    }
    this.router.navigateByUrl(this.navigation.initialUrl, {skipLocationChange: false});
  }

  manage_preview()
  {

  }

  manage_cancel()
  {

  }

  private format(style: string)
  {
    const textArea = (this.textRef.nativeElement as HTMLTextAreaElement);

    const selectionStart = textArea.selectionStart;
    const selectionEnd = textArea.selectionEnd;
    const selectedText = textArea.value.substring(selectionStart, selectionEnd);

    textArea.value =
      textArea.value.slice(0, selectionStart)
      + '<' + style + '>' + selectedText + '</' + style + '>'
      + textArea.value.slice(selectionEnd, textArea.value.length);
  }

  format_bold()
  {
    this.format('b');
  }

  format_italic()
  {
    this.format('i');
  }

  format_underlined()
  {
    this.format('u');
  }

  format_insertQuote()
  {
    this.format('blockquote');
  }

  format_insertCodeSnippet()
  {

  }

  private openHyperlinkDialog(selection?: string) : MatDialogRef<HyperlinkDialogComponent>
  {
    return this.matDialog.open(HyperlinkDialogComponent, {
      width: '400px',
      hasBackdrop: true,
      panelClass: 'dialog-panel',
      backdropClass: 'dark-backdrop',
      data: selection
    });
  }

  format_insertHyperlink()
  {
    const textArea = (this.textRef.nativeElement as HTMLTextAreaElement);

    const selectionStart = textArea.selectionStart;
    const selectionEnd = textArea.selectionEnd;
    const selectedText = textArea.value.substring(selectionStart, selectionEnd);

    let dialogRef = this.openHyperlinkDialog(selectedText);

    dialogRef.afterClosed().subscribe((response: HyperlinkModel) => {
      textArea.value =
      textArea.value.slice(0, selectionStart)
      + '<a href="' + response.url + '">' + response.textShown + '</a>'
      + textArea.value.slice(selectionEnd, textArea.value.length);
    });


  }

  private openPictureUploadDialog() : MatDialogRef<PictureDialogComponent>
  {
    return this.matDialog.open(PictureDialogComponent, {
      width: '400px',
      hasBackdrop: true,
      panelClass: 'dialog-panel',
      backdropClass: 'dark-backdrop'
    });
  }

  media_insertAudiotrack()
  {

  }

  media_insertModel3D()
  {

  }

  media_insertPicture()
  {
    const dialogRef = this.openPictureUploadDialog();

    dialogRef.afterClosed().subscribe(
      (picture: FormData) => {
        this.pictureService.uploadPicture(this.postModel.id, picture).subscribe(
          // upload photo logic
          response => console.log(response)
        );
    });

    const textArea = (this.textRef.nativeElement as HTMLTextAreaElement);

    textArea.value =
      textArea.value.slice(0, textArea.selectionStart)
      + '{{blogPost.media[0].url}}'
      + textArea.value.slice(textArea.selectionStart, textArea.value.length);

  }
}

