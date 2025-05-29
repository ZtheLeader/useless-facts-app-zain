import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationMessage } from '../models/notification.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private duration = 3000;

  private notificationSubject = new Subject<NotificationMessage>();
  public notification$ = this.notificationSubject.asObservable();

  constructor(private snackBar: MatSnackBar) { }

  /**
   * Displays a message in a snackbar.
   * @param message The error message to display.
   * @param duration Optional duration for the snackbar to be visible.
   */

  showMessage(message: string, duration?: number): void {
    this.notificationSubject.next({
      message,
      type: 'success'
    });

    this.openSnackBar(message, 'Close', 'success-notification', duration);
  }

  private openSnackBar(
    message: string,
    action: string,
    panelClass: string,
    duration?: number
  ): void {

    this.snackBar.open(message, action, {
      duration: duration || this.duration,
      panelClass: [panelClass],
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}
