import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Comment } from 'src/app/_models/comment';
import { CommentCreation, CommentCreationToken } from 'src/app/_models/commentCreation';
import { CommentsService } from 'src/app/_services/comments.service';
import { ToastService } from 'src/app/_services/toast.service';
import { TIMING } from '../navpie/navpie.component';
import { ToastData } from '../toast/toast-config';

@Component({
  selector: 'app-comment-creator',
  templateUrl: './comment-creator.component.html',
  styleUrls: ['./comment-creator.component.css'],
  animations: [
  //   trigger('scale', [
  //     transition(':enter', [
  //       style({ height: "0px" }),
  //       animate(TIMING, style({ height: "242px" }))
  //     ]),
  //     transition(':leave', [
  //       animate(TIMING, style({ height: "0px" }))
  //     ])
  //   ])
  // ],
    trigger('scale', [
      transition('*=>*', [
        style({ height: "0px" }),,
        animate(TIMING, style({ height: "242px" }))
      ])
    ])
  ]
})
export class CommentCreatorComponent implements OnInit {

  newComment = new Comment();
  commentForm: FormGroup;
  validationError: string;

  @ViewChild('cardRef', {read: ElementRef})
    cardRef: ElementRef;

  @Input()
    animationState: 'off' | 'on' = 'off';

  @Output()
    quitCommentCreatorEvent = new EventEmitter<boolean>();

  constructor(
    private commentsService: CommentsService,
    private toastService: ToastService,
    @Inject(CommentCreationToken) private commentCreation: CommentCreation)
  {
    this.newComment.parentBlogPostId = this.commentCreation.parentBlogPostId;
    this.newComment.parentCommentId = this.commentCreation.parentCommentId;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  submitNewComment()
  {
    if(!this.spewOutValidationErrors())
    {
      this.commentsService.createNewComment(this.newComment).subscribe(
        response => {
          this.toastService.displayToast({
            type: 'success',
            text: 'Thanks for your comment!'
          } as ToastData);
          this.commentsService.commentCreated$.next(true);
          this.quitCommentCreatorEvent.emit(true);
        });
    }
  }

  // returns true if any erros ocurred
  private spewOutValidationErrors() : boolean
  {
    const validationErrors = [];

    Object.keys(this.commentForm.controls).forEach(controlKey => {
      // if any errors exist,
      if(this.commentForm.get(controlKey).errors)
      {
        // then loop over them
        Object.keys(this.commentForm.get(controlKey).errors).forEach(error => {
          // display the toast with the corresponding message
          this.toastService.displayToast({
            type: 'warning',
            text: controlKey[0].toUpperCase() + controlKey.slice(1) + 'field ' + this.getErrorMessage(error)
          } as ToastData);
          validationErrors.push(error);
        })
      }
    });

    return validationErrors.length > 0;
  }

  private getErrorMessage(error: string)
  {
    switch (error) {
      case 'minlength':
        return "doesn't' meet the required length."
      case 'maxlength':
        return "exceeds the maximum length."
      case 'required':
        return 'was left in blank.'
      case 'hasStrongLanguage':
        return 'contains inappropriate language.'
      default:
        return 'had a validation error.';
    }
  }



  cancelCommentCreation()
  {
    // warn about data loss
    this.quitCommentCreatorEvent.emit(true);
  }

  initializeForm()
  {
    this.commentForm = new FormGroup({
      author: new FormControl('', this.getValidators(true, 4, 16)),
      content: new FormControl('', [...this.getValidators(true, 2, 144), this.languageFilter()])
    });

  }

  getValidators(isRequired: boolean, minLength: number, maxLength: number)
  {
    return [
      ...[isRequired? Validators.required : null],
      ...[Validators.required,
          Validators.minLength(minLength),
          Validators.maxLength(maxLength)]
      ];
  }

  languageFilter() : ValidatorFn
  {
    return (control: AbstractControl) =>
    {
      return (control?.value as string).includes('fuck')? {hasStrongLanguage: true} : null
    }
  }
}
