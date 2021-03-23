import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../../core/services/toastr.service';
import { NotificationType } from './../../core/models/notification-type';
import { Notification } from './../../core/models/notification';
@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss'],
})
export class ToastrComponent implements OnInit {
  notification: Notification;

  constructor(public toastrService: ToastrService) {}

  ngOnInit(): void {
    this.toastrService.getAlert().subscribe((alert: Notification) => {
      this.notification = alert;
      setTimeout(() => {
        this.notification = null;
      }, 4000);
    });
  }

  removeNotification(): void {
    this.notification = null;
  }

  cssClass(notification: Notification): string {
    if (!notification) {
      return;
    }
    switch (notification.type) {
      case NotificationType.Success:
        return 'toast-success';
      case NotificationType.Error:
        return 'toast-error';
      case NotificationType.Info:
        return 'toast-info';
      case NotificationType.Warning:
        return 'toast-warning';
    }
  }
}
