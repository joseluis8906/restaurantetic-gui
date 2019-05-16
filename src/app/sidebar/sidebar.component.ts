import { Component, OnInit, OnDestroy } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { SideBarItem } from "src/app/sidebar/sidebaritem/SideBarItem";
import { SessionService, SessionStatus } from "../utils/session.service";
import { Subscription } from "rxjs";
import { Usuario } from "../usuario/Usuario";
import { SessionStorageService } from "angular-web-storage";
import { ConfigService, App, Apps } from "../utils/config.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  items: Array<SideBarItem>;

  constructor(private router: Router, private sessionService: SessionService, private sessionStorageService: SessionStorageService, private configService: ConfigService) {
    const apps: Map<string, App> = this.configService.getApps();
    this.items = [
      {active: false, href: apps.get(Apps.Login).path, icon: "home", visible: true, roles: apps.get(Apps.Login).roles},
      {active: false, href: apps.get(Apps.Usuarios).path, icon: "people", visible: false, roles: apps.get(Apps.Usuarios).roles},
      {active: false, href: apps.get(Apps.Productos).path, icon: "restaurant_menu", visible: false, roles: apps.get(Apps.Productos).roles},
      {active: false, href: apps.get(Apps.Pedidos).path, icon: "shopping_cart", visible:  false, roles: apps.get(Apps.Pedidos).roles},
      {active: false, href: apps.get(Apps.Cocina).path, icon: "kitchen", visible: false, roles: apps.get(Apps.Cocina).roles},
      {active: false, href: apps.get(Apps.Caja).path, icon: "monetization_on", visible: false, roles: apps.get(Apps.Caja).roles}
    ];
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.sessionService.status$.subscribe((status: SessionStatus) => {
      if (status === SessionStatus.Logged) {
        const usuario: Usuario = this.sessionService.getUsuario();
        const roles = usuario.roles.split(",");
        let firstPath: string = null;
        this.items.forEach((item: SideBarItem) => {
          roles.forEach((role: string) => {
            if (item.roles.includes(role)) {
              firstPath = firstPath === null ? item.href : firstPath;
              item.visible = true;
            } else {
              item.visible = false;
            }
          });
        });
        this.router.navigateByUrl(firstPath);
      } else {
        this.items.forEach((item: SideBarItem) => item.href === "/login" ? item.visible = true : item.visible = false);
        this.router.navigateByUrl("/login");
      }
    }));

    this.subscriptions.add(this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.setActiveUrl(evt.urlAfterRedirects);
      }
    }));
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setActiveUrl(url: string): void {
    for (const item of this.items) {
      if (item.href === url) {
        item.active = true;
      } else {
        item.active = false;
      }
    }
  }

  changeActive(item_: SideBarItem): void {
    for (const item of this.items) {
      if (item.href === item_.href) {
        item.active = true;
      } else {
        item.active = false;
      }
    }
  }
}
