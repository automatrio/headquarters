import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music-blog',
  templateUrl: './music-blog.component.html',
  styleUrls: ['./music-blog.component.css']
})
export class MusicBlogComponent implements OnInit {

  homeContent : "MusicBlog" | "Devlog" | "Model3DBlog" | "NewsBlog" | "PictureBlog" = "MusicBlog";
  isHomepage = false;

  constructor() { }

  ngOnInit(): void {
  }

}
