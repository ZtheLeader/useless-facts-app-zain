import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {}

  showError(message: string): void {
    console.error(`Notification: ${message}`);
  }
  showSuccess(message: string): void {
    console.log(`Notification: ${message}`);
  }
  showWarning(message: string): void {
    console.warn(`Notification: ${message}`);
  }
}
