import { Component, OnInit } from '@angular/core';
import { Content } from 'src/app/_models/content';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeContent : "MusicBlog" | "DevLog" | "Model3DBlog" | "NewsBlog" | "PictureBlog" = "NewsBlog";
  isHomepage = true;
  
  constructor() { }

  ngOnInit(): void {
  }

}
