import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService, MessageType } from "./notification.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  open: boolean;
  alertType: string;
  message: string;

  constructor(private notificationService: NotificationService) {
    this.subscription = new Subscription();
    this.open = true;
    this.message = null;
    this.alertType = MessageType.Info;

    this.subscription.add(this.notificationService.message$.subscribe((message: string) => {
      if (message !== null) {
        this.open = true;
        this.alertType = this.notificationService.getMessageType();
      }
      this.message = message;
    }));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
