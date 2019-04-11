import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-caja",
  templateUrl: "./caja.component.html",
  styleUrls: ["./caja.component.scss"],
})
export class CajaComponent implements OnInit {

  data: any[];

  constructor() {
    this.data = [
      {name: "in progress", value: 1000},
      {name: "success", value: 1200},
      {name: "error", value: 1500},
    ];
  }

  ngOnInit() {
  }

}
