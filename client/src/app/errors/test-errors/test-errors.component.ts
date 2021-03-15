import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastData } from 'src/app/toast/toast-config';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {

  baseUrl = "https://localhost:5001/api/";

  constructor(private http: HttpClient, private toast: ToastService) { }

  ngOnInit(): void {
  }

  get404error() {
    this.http.get(this.baseUrl + "buggy/not-found").subscribe();
  }

  get400error() {
    this.http.get(this.baseUrl + "buggy/bad-request").subscribe();
  }

  get401error() {
    this.http.get(this.baseUrl + "buggy/auth").subscribe();
  }

  get500error() {
    this.http.get(this.baseUrl + "buggy/server-error").subscribe();
  }
}
