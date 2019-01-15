import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  } from "@angular/core";
import { Producto } from "src/app/producto/producto";

@Component({
  selector: "app-producto-view",
  templateUrl: "./producto-view.component.html",
  styleUrls: ["./producto-view.component.scss"],
})
export class ProductoViewComponent implements OnInit {

  @Input() producto: Producto;

  @Output() editEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onEdit(event) {
    this.editEvent.emit(true);
  }

  onEliminar(event) {
    console.log("eliminar");
  }
}
