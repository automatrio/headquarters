import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

export const TIMING = '1000ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
  selector: 'app-navpie',
  templateUrl: './navpie.component.html',
  styleUrls: ['./navpie.component.css']
})
export class NavpieComponent implements AfterViewInit{

  icons: string[] = ['create', 'build', 'camera_enhance', 'call', 'lock'];
  labels: string[] = ['Devlogs', 'Skiltree', 'Portfolio', 'Contact', 'Admin'];
  display: string[];
  listOfIcons = document.getElementsByClassName('material-icons');
  index: number;
  isExpanded: string;

  radius = 150;

  constructor() {
    this.display = Object.assign([], this.icons);
   }

  ngAfterViewInit(): void {
    NavpieComponent.setButtonPosition(this.listOfIcons, this.radius);
  }

  static getButtonPosition(buttonIndex: number, radius: number): string
  {
    let x: number;
    let y: number;

    const angle = (2 * 3.14)/8 * (buttonIndex - 1); 

    x = Math.cos(angle) * radius;
    y = Math.sin(angle) * radius;

    return Math.round(x) + "px, " + Math.round(y) + "px, 0";
  }

  static setButtonPosition(list: HTMLCollectionOf<Element>, radius: number)
  {
    for (let i = 0; i < list.length; i++) {
      
      const currentElement = list[i] as HTMLElement;
      const position = NavpieComponent.getButtonPosition(i, radius);

      currentElement.style.transform = "translate3D(0,0,0)";

      const finishedAnimationPromise = currentElement.animate(
          {
            transform: "translate3D(" + position +")",
            
          }, {duration: 1000, easing: "cubic-bezier(0.25, 0.8, 0.25, 1)"}
        ).finished

      const finishedAnimationObservable = from(finishedAnimationPromise).subscribe(
        () => { 
          currentElement.style.transform = "translate3D(" + position +")";
          finishedAnimationObservable.unsubscribe();
        });
    }
  }

  expandIcon(event: Event)
  {
    const element = event.currentTarget as HTMLElement;

    if(this.isExpanded != element.id)
    {  
      this.index = parseInt(element.id);

      const finishedAnimationPromise = element.animate(
      {
        minWidth: "100px",
        color: "rgba(255,255,255,0)"
      }, {duration: 100}).finished;

      const finishedAnimationObservable = from(finishedAnimationPromise).subscribe(
      () => {
        // stores the final state
        element.className = "li icon-text";
        element.style.minWidth = "100px";
        element.style.color = "rgba(51,51,51,0)";

        // changes the text
        this.display[this.index] = this.labels[this.index];

        from(element.animate({color: "rgba(51,51,51,1)"}, 100).finished).subscribe( () => element.style.color = "rgba(51,51,51,1)");

        // makes sure only one element is affected at a time
        this.isExpanded = element.id;
        finishedAnimationObservable.unsubscribe();
        });
    }
    else { 
      return;
    }
  }

  resetIcon(event: Event)
  {
    const element = event.currentTarget as HTMLElement;

    if(this.isExpanded == element.id)
    {
      const finishedAnimationPromise = element.animate({
        color: "rgba(51,51,51,0)",
        width: "54px",
        minWidth: "54px"

      }, {duration: 100}).finished;

      const finishedAnimationObservable = from(finishedAnimationPromise).subscribe(
        () => {
          element.className = "li material-icons";
          element.style.minWidth = "54px";
          element.style.width = "54px";
          element.style.color = "rgba(51,51,51,0)";

          this.display[this.index] = this.icons[this.index];

          from(element.animate({color: "rgba(51,51,51,1)"}, 100).finished).subscribe( () => element.style.color = "rgba(51,51,51,1)");

          this.isExpanded = "";
          finishedAnimationObservable.unsubscribe();
        });
    }
    else { 
      return;
    }
  }

  async incrementText()
  {
    this.display[this.index] = this.labels[this.index].slice(0,2);

    for (let i = 2; i < this.labels[this.index].length; i++) {

      await this.sleep(20).then(() => {
       
        this.display[this.index] = this.labels[this.index].slice(0, i+1);
      
      })

    }

    if(this.display[this.index] != this.labels[this.index])
    {
      this.display[this.index] = this.labels[this.index];
    }
  }

  async decrementText()
  {
    for (let i = 0; i < this.labels[this.index].length - 2; i++) {

      await this.sleep(20).then(() => {
       
        this.display[this.index] = this.display[this.index].slice(0, this.labels[this.index].length - i);
      
      })

    }
  }

  sleep(length)
  {
    return new Promise(resolve => setTimeout(resolve, length));
  }

}
