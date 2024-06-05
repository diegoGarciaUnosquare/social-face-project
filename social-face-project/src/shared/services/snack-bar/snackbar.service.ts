import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}

  /**
   *  This method is used to open a snackbar with a message
   * that can be either an error or a success message.
   * @param message Message to be displayed in the snackbar
   */
  public openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 5000 });
  }
}
