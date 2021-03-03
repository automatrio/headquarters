import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  loginModel: any = {};

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
  }

  login()
  {
    this.accountService.login(this.loginModel).subscribe(
      response => console.log(response),
      error => console.log(error.error) // improve
    );
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
