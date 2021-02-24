import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title: string = 'Automatrio Headquarters';
  baseUrl: string = "https://localhost:5001/api/";

  constructor(private http: HttpClient)
  {

  }

  ngOnInit(): void {
    this.http.get(this.baseUrl + "admins").subscribe();
  }


}
