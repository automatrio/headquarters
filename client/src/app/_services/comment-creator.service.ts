import { ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentCreatorRef } from '../_components/comment-creator/comment-creator-ref';
import { CommentCreatorComponent } from '../_components/comment-creator/comment-creator.component';
import { CommentCreation, CommentCreationToken } from '../_models/commentCreation';

@Injectable({
  providedIn: 'root'
})
export class CommentCreatorService {

  constructor(
    private factoryResolver: ComponentFactoryResolver
  ) { }

  displayCreator(commentCreation: CommentCreation) : CommentCreatorRef
  {
    const factory = this.factoryResolver.resolveComponentFactory(CommentCreatorComponent);

    const componentRef = factory.create(Injector.create({providers: [
      {provide: CommentCreationToken, useValue: commentCreation}
    ]}));

    const commentCreatorRef = new CommentCreatorRef(componentRef);

    const quitSubspricption = componentRef.instance.quitCommentCreatorEvent.subscribe(
      (event: boolean) => {
        commentCreatorRef.quit();
        quitSubspricption.unsubscribe();
      }
    );

    return commentCreatorRef;
  }
}
