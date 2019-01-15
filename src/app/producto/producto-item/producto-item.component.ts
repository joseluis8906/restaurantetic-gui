import { Component, Input, OnInit } from "@angular/core";
import { Producto } from "src/app/producto/producto";

@Component({
  selector: "app-producto-item",
  templateUrl: "./producto-item.component.html",
  styleUrls: ["./producto-item.component.scss"],
})
export class ProductoItemComponent implements OnInit {
  @Input() producto: Producto;
  edit: boolean = false;

  constructor() { }

  ngOnInit() { }

  changeEdit(event): void {
    this.edit = event;
  }
}
