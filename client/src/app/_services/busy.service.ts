import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyRequestCount = 0;

  constructor(private spinner: NgxSpinnerService) { }

  busy()
  {
    this.busyRequestCount++;
    this.spinner.show(undefined, {
      size: 'default',
      type: 'ball-8bits',
      bdColor: 'rgba(0,0,0,.6)',
      color: '#666666'
    });
  }

  idle()
  {
    this.busyRequestCount--;
    if(this.busyRequestCount <= 0)
    {
      this.busyRequestCount = 0;
      this.spinner.hide();
    }
  }
}
