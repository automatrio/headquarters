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

      from(finishedAnimationPromise).subscribe(
        () => currentElement.style.transform = "translate3D(" + position +")"
      );
    }
  }

  async expandIcon(event: Event)
  {
    const element = event.target as HTMLElement;

    if(this.isExpanded != element.id)
    {
      
      const borderCurvature = parseFloat(getComputedStyle(element).height) + "px";
      this.index = parseInt(element.id);

      const finishedAnimationPromise = element.animate(
        {
          // borderRadius: borderCurvature,
          // width: "100px",
          color: "rgba(255,255,255,0)"
        }, {duration: 300, easing: "cubic-bezier(0.25, 0.8, 0.25, 1)"}).finished;

      from(finishedAnimationPromise).subscribe(
        () => {
          element.className = "li icon-text";
          // element.style.width = "100px";
          element.style.borderRadius = borderCurvature;
          this.incrementText();
          this.isExpanded = element.id;
        }
      )
    }
    return;
  }

  resetIcon(event: Event)
  {
    const element = event.target as HTMLElement;

    if(this.isExpanded == element.id)
    {
      this.decrementText().then(
        () => {
          const finishedAnimationPromise = element.animate({
            color: "rgba(255,255,255,0)",
            width: "54px"
          }, {duration: 150, easing: "cubic-bezier(0.25, 0.8, 0.25, 1)"}).finished;

          from(finishedAnimationPromise).subscribe(
            () => {
              this.display[this.index] = this.icons[this.index];
              element.className = "li material-icons";
              this.isExpanded = ""
            }
          )
        }
      )
    }
    return;
  }

  async incrementText()
  {
    this.display[this.index] = this.labels[this.index].slice(0,2);

    for (let i = 2; i < this.labels[this.index].length; i++) {

      await this.sleep(20).then(() => {
       
        this.display[this.index] += this.labels[this.index].slice(i, i+1);
      
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
