import { Component, HostListener, OnInit } from "@angular/core";
import { Pedido } from "src/app/pedido/pedido";
import { Producto } from "src/app/producto/producto";
import { ProductoService } from "src/app/producto/producto.service";
import { Item } from "src/app/pedido/item";
import { PedidoService } from "src/app/pedido/pedido.service";

@Component({
  selector: "app-pedido-item-view",
  templateUrl: "./pedido-item-view.component.html",
  styleUrls: ["./pedido-item-view.component.scss"],
})
export class PedidoItemViewComponent implements OnInit {

  items: Item[] = [];
  sinIngredientes: string[] = [];

  screenHeight: number;

  constructor(private pedidoService: PedidoService, private productoService: ProductoService) {
    this.pedidoService.pedido$.subscribe((pedido: Pedido) => {
      this.items = [];
      for (const item of pedido.items) {
        this.items.push(item);
      }
    });
  }

  ngOnInit() {
    this.calculateHeight();
  }

  getSinIngredientes(item: Item): void {
    this.sinIngredientes = [];
    if (item.sinIngredientes !== null && item.sinIngredientes !== undefined) {
      this.sinIngredientes = item.sinIngredientes.split(",").filter((x) => item.producto.ingredientes.includes(x));
    }
  }

  calculateHeight(): void {
    this.screenHeight = window.innerHeight - 54;
  }

  @HostListener("window:resize", ["$event"])
  onResizedDisplay(event?) {
    this.calculateHeight();
  }

  onCambiarEstado(item: Item, estado: string): void {
    for (const item_ of this.items) {
      if (item_.numero === item.numero) {
        if (estado == "listo" && item_.estado !== "listo") {
          item_.estado = estado;
          this.pedidoService.cambiarEstadoItem(item_).subscribe(() => {console.log("actualizado")});
        }
        if (estado == "en preparacion" && item_.estado !== "listo") {
          item_.estado = estado;
          this.pedidoService.cambiarEstadoItem(item_).subscribe(() => {console.log("actualizado")});
        }
        if (estado == "en espera" && item_.estado !== "en preparacion" && item_.estado !== "listo") {
          item_.estado = estado;
          this.pedidoService.cambiarEstadoItem(item_).subscribe(() => {console.log("actualizado")});
        }
      }
    }
  }
}
