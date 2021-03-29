import { Component } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { NavpieOverlayService } from './_services/navpie-overlay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Automatrio Headquarters';
  isNavbar: boolean = true;

  constructor(
    private accountService: AccountService,
    ) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser()
  {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

  switchNavMenus(event: boolean)
  {
    console.log("this is hapenning")
    this.isNavbar = event;
  }
}