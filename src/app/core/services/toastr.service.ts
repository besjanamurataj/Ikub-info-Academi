import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { NotificationType } from '../models/notification-type';
import { Notification } from '../models/notification';

@Injectable({ providedIn: 'root' })
export class ToastrService {
  public subject = new Subject<Notification>();

  constructor() {}

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string): void {
    this.showNotification(NotificationType.Success, message);
  }

  error(message: string): void {
    this.showNotification(NotificationType.Error, message);
  }

  info(message: string): void {
    this.showNotification(NotificationType.Info, message);
  }

  warn(message: string): void {
    this.showNotification(NotificationType.Warning, message);
  }

  showNotification(type: NotificationType, message: string): void {
    this.subject.next({ type, message });
  }

  clear(): void {
    this.subject.next();
  }
}
