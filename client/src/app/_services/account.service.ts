import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { browser } from 'protractor';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl: string = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private http: HttpClient) { }

  login(model: any)
  {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        if(response != null)
        {
          localStorage.setItem('user', JSON.stringify(response));
          this.setCurrentUser(response);
        }
      })
    );
  }

  setCurrentUser(user: User)
  {
    this.currentUserSource.next(user);
  }

  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

}
