import { Component, OnInit, OnDestroy } from "@angular/core";
import { SessionService, SessionStatus } from "../utils/session.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-titlebar",
  templateUrl: "./titlebar.component.html",
  styleUrls: ["./titlebar.component.scss"],
})
export class TitlebarComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  visible: boolean;

  constructor(private sessionService: SessionService) {
    this.subscriptions = new Subscription();
    this.visible = false;

    this.subscriptions.add(this.sessionService.status$.subscribe((status: SessionStatus) => {
      if (status === SessionStatus.Logged) {
        this.visible = true;
      } else {
        this.visible = false;
      }
    }));
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onLogout() {
    this.sessionService.logout();
  }
}
