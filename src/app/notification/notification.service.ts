import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private messageSubject: Subject<string>;
  public message$: Observable<string>
  private messageType: string;
  private timeout: number;
  private timer: number;

  constructor() {
    this.messageType = MessageType.Info;
    this.timeout = 5000;
    this.messageSubject = new Subject<string>();
    this.message$ = this.messageSubject.asObservable();
  }

  getMessageType(): string {
    return this.messageType;
  }

  setTimeout(timeout: number): void {
    this.timeout = timeout * 1000;
  }

  showMessage(message: string, messageType: MessageType, timeout?: number): void {
    clearTimeout(this.timer);
    if ([MessageType.Success, MessageType.Info, MessageType.Warn, MessageType.Error].includes(messageType)) {
      this.messageType = messageType;
    }
    if (timeout) {
      this.setTimeout(timeout);
    }
    this.messageSubject.next(message);
    this.timer = setTimeout(this.closeMessage.bind(this), this.timeout);
  }

  closeMessage(): void {
    this.messageType = MessageType.Info;
    this.messageSubject.next(null);
  }
}

export enum MessageType {
  Success = "success",
  Info = "primary",
  Warn = "warning",
  Error = "danger"
};

