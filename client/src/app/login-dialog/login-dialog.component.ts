import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, ReplaySubject } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastService } from '../_services/toast.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  loginModel: any = {};
  errorMessageSource = new ReplaySubject<string>(1);
  errorMessage$: Observable<string> = this.errorMessageSource;
  
  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private accountService: AccountService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
  }

  login()
  {
    this.accountService.login(this.loginModel).subscribe(
      response =>
      {
        console.log(response);
        this.dialogRef.close();
      },
      error => 
      { 
        this.errorMessageSource.next(error.error);
      }
    );
    
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
