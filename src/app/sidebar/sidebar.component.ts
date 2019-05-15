import { Component, OnInit, OnDestroy } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { SideBarItem } from "src/app/sidebar/sidebaritem/SideBarItem";
import { SessionService, SessionStatus } from "../utils/session.service";
import { Subscription } from "rxjs";
import { Usuario } from "../usuario/Usuario";
import { SessionStorageService } from "angular-web-storage";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;

  items: SideBarItem[] = [
    {active: false, href: "/login", icon: "home", visible: true, roles: ["none"]},
    {active: false, href: "/usuarios", icon: "people", visible: false, roles: ["admin"]},
    {active: false, href: "/productos", icon: "restaurant_menu", visible: false, roles: ["admin"]},
    {active: false, href: "/pedidos", icon: "shopping_cart", visible:  false, roles: ["mesero", "cajero"]},
    {active: false, href: "/cocina", icon: "kitchen", visible: false, roles: ["cocinero"]},
    {active: false, href: "/caja", icon: "monetization_on", visible: false, roles: ["cajero"]}
  ];

  constructor(private router: Router, private sessionService: SessionService, private sessionStorageService: SessionStorageService) {
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.sessionService.status$.subscribe((status: SessionStatus) => {
      if (status === SessionStatus.Logged) {
        const usuario: Usuario = this.sessionService.getUsuario();
        const roles = usuario.roles.split(",");
        let firstPath: string = null;
        this.items.forEach((item: SideBarItem) => {
          item.roles.forEach((role: string, index: number) => {
            if (roles.includes(role)) {
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
