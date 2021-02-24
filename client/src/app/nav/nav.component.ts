import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  hoverables: HTMLCollectionOf<Element> = document.getElementsByClassName("hoverable");
  originalBackgroundColor: string;

  constructor() { }

  ngOnInit(): void {
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
}
