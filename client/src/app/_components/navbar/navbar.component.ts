import { animate, AnimationEvent, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { from, Subject } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { LoginDialogOverlayService } from 'src/app/_services/login-dialog-overlay.service';

export const TIMING = '1000ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
      trigger('slide',[
        transition('void => *', 
            query(
            /*1*/ "mat-toolbar-row.mat-toolbar-row.navbar-row",
            /*2*/ [
                    stagger(
                      200,
                      animate(TIMING, style({ transform: 'translateX(0px)' }))
                      )
                  ]
            )
          )
      ]
    )
  ]
})
export class NavbarComponent implements OnInit, AfterViewInit {

  mouseHover = '';
  slideState: 'slideIn' | 'slideOut' = 'slideIn';
  originalColor: string = '';
  newColor: string = '';
  navbarRow = document.getElementsByClassName('navbar-row');

  @ViewChildren("navrow", {read: ElementRef})
    navRows: QueryList<ElementRef>

  @Output()
  switchMenusEvent = new EventEmitter<string>();


  constructor(
    private loginDialogOverlayService: LoginDialogOverlayService,
    public accountService: AccountService
    ) {}


  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  increaseAlpha(event: Event)
  {
    const currentElement = event.target as HTMLElement;
    this.originalColor = getComputedStyle(currentElement).backgroundColor;

    this.newColor = this.originalColor.slice(0, -5) + "1.0)";

    currentElement.animate([
      {
        backgroundColor: this.originalColor
      },
      {
        backgroundColor: this.newColor
      }
    ], 75)

    currentElement.style.backgroundColor = this.newColor;
  }

  resetAlpha(event: Event)
  {
    const currentElement = event.target as HTMLElement;

    currentElement.animate([
      {
        backgroundColor: this.newColor
      },
      {
        backgroundColor: this.originalColor
      }
    ], 50)

    currentElement.style.backgroundColor = this.originalColor.slice(0, -5) + "0.4)";
  }

  async slideOutMenu(event: Event)
  { 
    await this.slideRows(
      () => this.switchMenusEvent.emit((event.target as HTMLElement).id)
      );
  }

  sleep(length)
  {
    return new Promise(resolve => setTimeout(resolve, length));
  }

  onAnimationDone(event: AnimationEvent)
  {
    for (let i = 0; i < this.navbarRow.length; i++) {
      (this.navbarRow[i] as HTMLElement).style.transform = "translateX(0px)";
    }
  }

  openLoginDialog()
  {
    this.loginDialogOverlayService.open();
  }

  async slideRows(next)
  {
    for (let i = 0; i < this.navRows.length; i++) {

      const finishedAnimationPromise = (this.navbarRow[i] as HTMLElement)?.animate(
        {
          transform: "translateX(-1500px)"
        }, {duration: 600, easing: "cubic-bezier(0.25, 0.8, 0.25, 1)"}
      ).finished;

      const finishedAnimationObservable = from(finishedAnimationPromise).subscribe(
        () => {
          console.log("finally");
          (this.navbarRow[i] as HTMLElement).style.transform = "translateX(-1500px)";

          // continue from last animation
          if(i == this.navbarRow.length - 1)
          {
            next();
          }
          finishedAnimationObservable.unsubscribe();
        });

      await this.sleep(200);
    }
  }

}
