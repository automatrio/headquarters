import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from '../_services/toast.service';
import { LoginDialogOverlayRef } from '../login-dialog/login-dialog-overlay-ref';
import { LoginDialogOverlayService } from '../_services/login-dialog-overlay.service';
import { ToastData } from '../toast/toast-config';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  hoverables: HTMLCollectionOf<Element> = document.getElementsByClassName("hoverable");
  originalBackgroundColor: string;
  currentUser$: Observable<User>;
  greetUser: User;

  constructor(
    private loginDialog: LoginDialogOverlayService,
    public accountService: AccountService,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  RGBA_toString(red: number, green: number, blue: number, alpha: number): string {
    return("rgba("+red+","+green+","+"blue"+","+alpha+")");
  }

  highlight(event: Event) : void {

    let element = event.target as HTMLElement;
    this.originalBackgroundColor = getComputedStyle(element).backgroundColor;
    let firstSplit = this.originalBackgroundColor.split("(")[1].split(")")[0];
    let rgb = firstSplit.split(",");

    element.style.backgroundColor = "rgba("+rgb[0]+","+rgb[1]+","+rgb[2]+", 0.75)";
  }

  reset(event: Event) : void
  {
    let element = event.target as HTMLElement;
    this.originalBackgroundColor = getComputedStyle(element).backgroundColor;
    let firstSplit = this.originalBackgroundColor.split("(")[1].split(")")[0];
    let rgb = firstSplit.split(",");

    element.style.backgroundColor = "rgba("+rgb[0]+","+rgb[1]+","+rgb[2]+", 0.5)";
  }

  openLoginDialog(): void {
    let currentDialogRef = this.loginDialog.open();
  }

  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    const data = {type:'success', text:'Good-bye!'} as ToastData;
    this.toast.displayToast(data);
  }
}
