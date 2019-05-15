import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SessionService, SessionStatus } from "src/app/utils/session.service";
import { Subscription } from 'rxjs';
import { NotificationService, MessageType } from '../notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;

  formControl: FormGroup;

  username: FormControl;
  password: FormControl;

  constructor(private formBuilder: FormBuilder, private sessionService: SessionService, private notificationService: NotificationService) {
    this.subscriptions = new Subscription();
    this.username = new FormControl("", [Validators.required]);
    this.password = new FormControl("", [Validators.required]);

    this.formControl = formBuilder.group({
      "username": this.username,
      "password": this.password,
    });

    this.subscriptions.add(this.sessionService.status$.subscribe((status: SessionStatus) => {
      if (status === SessionStatus.Logged) {
        this.notificationService.showMessage("Login exitoso", MessageType.Success);

      }
      if (status === SessionStatus.Failed) {
        this.notificationService.showMessage("Login fallido", MessageType.Error);
      }
    }));
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getErrorMessage(field: string): string {
    switch(field) {
      case "username":
        return this.username.hasError("required") ? "El campo es obligatorio" : "";

      case "password":
        return this.password.hasError("required") ? "El campo es obligatorio" : "";
    }
  }

  onEntrar(): void {
    if (this.formControl.valid) {
      this.sessionService.login(this.username.value, this.password.value);
    }
  }
}
