import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
  } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Pedido } from "src/app/pedido/pedido";
import { PedidoService } from "src/app/pedido/pedido.service";
import { Ingrediente } from "src/app/producto/ingrediente";
import { Producto } from "src/app/producto/producto";
import { ProductoIngredienteDialogComponent } from "src/app/producto/producto-ingrediente-dialog/producto-ingrediente-dialog.component";
import { Subscription } from "rxjs";
import { ItemBuilder } from "src/app/pedido/item";

@Component({
  selector: "app-producto-view-mini",
  templateUrl: "./producto-view-mini.component.html",
  styleUrls: ["./producto-view-mini.component.scss"],
})
export class ProductoViewMiniComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  pedido: Pedido;
  @Input() producto: Producto;
  @Output() addProducto: EventEmitter<Producto> = new EventEmitter<Producto>();

  constructor(public dialog: MatDialog, public pedidoService: PedidoService) {
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.pedidoService.pedido$.subscribe((pedido) => {
      this.pedido = pedido;
    }));
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onOpenDialog(): void {
    if (!this.pedido) {
      return null;
    }
    const ingredientesList: Ingrediente[] = [];

    for (const ingrediente of this.producto.ingredientes.split(",")) {
      ingredientesList.push(new Ingrediente(ingrediente, true));
    }

    const dialogRef = this.dialog.open(
      ProductoIngredienteDialogComponent,
      { width: "256px",
        height: "256px",
        data: {ingredientes: ingredientesList}});

    this.subscriptions.add(dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      const ingredientesFinales: string[] = [];
      for (const ingrediente of result) {
        if (!ingrediente.activo) {
          ingredientesFinales.push(ingrediente.nombre.trim());
        }
      }
      const tmpProducto = Object.assign({}, this.producto);
      tmpProducto.ingredientes = ingredientesFinales.join(",");
      const tmpItem = new ItemBuilder()
      .withNumero(this.pedido.items.length + 1)
      .withProduto(this.producto)
      .withSinIngredientes(tmpProducto.ingredientes)
      .withPrecio(this.producto.precio)
      .withEstado("en espera")
      .build();
      this.pedidoService.addItem(tmpItem);
    }));
  }
}
