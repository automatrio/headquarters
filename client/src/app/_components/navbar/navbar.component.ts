import { animate, AnimationEvent, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { slideAnimation, TIMING } from 'src/app/_helpers/animations';
import { AccountService } from 'src/app/_services/account.service';
import { LoginDialogOverlayService } from 'src/app/_services/login-dialog-overlay.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: slideAnimation
})

export class NavbarComponent implements OnInit, AfterViewInit {

  slideState: 'slideIn' | 'slideOut' = 'slideOut';
  originalColor: string = '';
  newColor: string = '';
  navbarRow = document.getElementsByClassName('navbar-row');
  ready: boolean = false;
  destination: string;

  @Input()
    slideAnimationState$ = new Observable<AnimationEvent>();

  @ViewChildren("navrow", {read: ElementRef})
    navRow: QueryList<ElementRef>

  @Output()
    switchMenusEvent = new EventEmitter<string>();

  constructor(
    private loginDialogOverlayService: LoginDialogOverlayService,
    public accountService: AccountService) 
    {}

  ngAfterViewInit(): void {
    this.navRow.forEach( row => {
      const currentRow = (row.nativeElement as HTMLElement);

      currentRow.style.transform = "translateX(-1500px)";
    });
  }

  ngOnInit(): void {
    this.ready = true;
    this.slideState = 'slideIn';

    this.slideAnimationState$.subscribe(
      event => {
        this.onAnimationDone(event)
      }
    )
  }

  increaseAlpha(event: Event)
  {
    const currentElement = event.currentTarget as HTMLElement;
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
    const currentElement = event.currentTarget as HTMLElement;

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

  slideOutMenu(event: Event)
  {
    this.destination = (event.currentTarget as HTMLElement).id;
    this.switchMenusEvent.emit(this.destination);
  }

}
