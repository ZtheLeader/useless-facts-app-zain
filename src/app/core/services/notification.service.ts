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

  showSuccess(message: string, duration?: number): void {
    this.notificationSubject.next({
      message,
      type: 'success'
    });

    this.openSnackBar(message, 'Close', 'success-notification', duration);
  }

  showError(message: string, duration?: number): void {
    this.notificationSubject.next({
      message,
      type: 'error'
    });

    this.openSnackBar(message, 'Close', 'error-notification', duration);
  }

  showWarning(message: string, duration?: number): void {
    this.notificationSubject.next({
      message,
      type: 'warning'
    });

    this.openSnackBar(message, 'Close', 'warning-notification', duration);
  }

  showInfo(message: string, duration?: number): void {
    this.notificationSubject.next({
      message,
      type: 'info'
    });
    this.openSnackBar(message, 'Close', 'info-notification', duration);
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
