import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Ingrediente } from "src/app/producto/ingrediente";
import { Producto } from "src/app/producto/producto";
import { ProductoIngredienteDialogComponent } from "src/app/producto/producto-ingrediente-dialog/producto-ingrediente-dialog.component";

@Component({
  selector: "app-producto-view-mini",
  templateUrl: "./producto-view-mini.component.html",
  styleUrls: ["./producto-view-mini.component.scss"],
})
export class ProductoViewMiniComponent implements OnInit {

  @Input() producto: Producto;
  @Output() addProducto: EventEmitter<Producto> = new EventEmitter<Producto>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  onOpenDialog(): void {
    const ingredientesList: Ingrediente[] = [];

    for (const ingrediente of this.producto.ingredientes) {
      ingredientesList.push(new Ingrediente(ingrediente, true));
    }

    const dialogRef = this.dialog.open(
      ProductoIngredienteDialogComponent,
      { width: "256px",
        height: "256px",
        data: {ingredientes: ingredientesList}});

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      const ingredientesFinales: string[] = [];
      for (const ingrediente of result) {
        if (ingrediente.activo) {
          ingredientesFinales.push(ingrediente.nombre);
        }
      }
      const tmpProducto = this.producto;
      tmpProducto.ingredientes = ingredientesFinales;
      this.addProducto.emit(tmpProducto);
    });
  }
}
