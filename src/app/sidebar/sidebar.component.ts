import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { SideBarItem } from "src/app/sidebar/sidebaritem/SideBarItem";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {

  items: SideBarItem[] = [
    {active: false, href: "/home", icon: "home"},
    {active: false, href: "/usuarios", icon: "people"},
    {active: false, href: "/productos", icon: "restaurant_menu"},
    {active: false, href: "/pedidos", icon: "shopping_cart"},
    {active: false, href: "/cocina", icon: "kitchen"},
    {active: false, href: "/caja", icon: "monetization_on"}
  ];

  constructor(private router: Router) {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.setActiveUrl(evt.urlAfterRedirects);
      }
    });
  }

  ngOnInit() { }

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
