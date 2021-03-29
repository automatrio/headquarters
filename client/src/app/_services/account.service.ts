import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http: HttpClient;

  baseUrl: string = environment.APIUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private httpBackend: HttpBackend)
    {
      this.http = new HttpClient(httpBackend);
    }

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
