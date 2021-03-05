import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar : MatSnackBar) { }

  displayQuickMessage(message: string)
  {
    this.snackBar.open(
      message,
      null,
      {
        duration: 2000,
        panelClass: "message-toast"
      });
  }

  displayError(message: string)
  {
    this.snackBar.open(
      message,
      "Ok",
      {
        panelClass: "error-toast"
      }
    )
    this.snackBar._openedSnackBarRef.onAction().subscribe(
      result => this.snackBar.dismiss()
    );
  }
}
