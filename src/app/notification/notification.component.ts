import { Component, OnInit } from '@angular/core';
import { NotificationService, MessageType } from "./notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  open: boolean;
  alertType: string;
  message: string;

  constructor(private notificationService: NotificationService) {
    this.open = true;
    this.message = null;
    this.alertType = MessageType.Info;

    this.notificationService.message$.subscribe((message: string) => {
      if (message !== null) {
        this.open = true;
        this.alertType = this.notificationService.getMessageType();
      }
      this.message = message;
    })
  }

  ngOnInit() {
  }

}
