import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastData } from '../toast/toast-config';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { ToastService } from '../_services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
  constructor(private accountService: AccountService, private toast: ToastService) {}

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map((user: User) => {
        if(user) return true;
        const data = ({type:'warning', text:'Unauthorized. Plese login first.'}) as ToastData;
        this.toast.displayToast(data);
      })
    )
  }
  
}
