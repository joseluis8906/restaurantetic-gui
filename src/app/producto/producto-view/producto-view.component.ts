import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  } from "@angular/core";
import { Producto } from "src/app/producto/producto";
import { ProductoService } from "src/app/producto/producto.service";

@Component({
  selector: "app-producto-view",
  templateUrl: "./producto-view.component.html",
  styleUrls: ["./producto-view.component.scss"],
})
export class ProductoViewComponent implements OnInit {

  @Input() producto: Producto;
  @Output() editEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private productoService: ProductoService) { }

  ngOnInit() { }

  onEdit(event) {
    this.editEvent.emit(true);
  }

  onEliminar(codigo: string) {
    this.productoService.removeProducto(codigo);
  }
}
