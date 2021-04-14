import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentManagerComponent } from '../_components/content-manager/content-manager.component';

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<unknown> {
  
  canDeactivate(component: ContentManagerComponent): boolean {
    if(component.managerForm.dirty)
    {
      return confirm('Are you sure you want to leave this page? Any unsaved changes will be lost.')
    }    
    return true;
  }
  
}
