import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  } from "@angular/core";
import { Producto } from "src/app/producto/producto";

@Component({
  selector: "app-producto-edit",
  templateUrl: "./producto-edit.component.html",
  styleUrls: ["./producto-edit.component.scss"],
})
export class ProductoEditComponent implements OnInit {

  @Input() producto: Producto;
  @Output() editEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {  }

  onGuardar(event: Event) {
    console.log("guardar");
  }

  onCancelar(event: Event): void {
    this.editEvent.emit(false);
  }
}
