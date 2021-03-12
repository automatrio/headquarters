import { Component, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ToastConfig, ToastData, TOAST_CONFIG_TOKEN } from './toast-config';
import { ToastRef } from './toast-ref';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  constructor(
    readonly data: ToastData,
    readonly ref: ToastRef,
    @Inject(TOAST_CONFIG_TOKEN) private toastConfig: ToastConfig // injects the TOAST_CONFIG_TOKEN into toastConfig
  ) { }

  ngOnInit(): void {
  }

  close()
  {
    this.ref.close();
  }

}
