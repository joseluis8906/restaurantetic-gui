import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-sidebaritem",
  templateUrl: "./sidebaritem.component.html",
  styleUrls: ["./sidebaritem.component.scss"],
})
export class SidebaritemComponent implements OnInit {

  @Input() active: boolean;
  @Input() href: string;
  @Input() icon: string;

  constructor() { }

  ngOnInit() {
  }
}
