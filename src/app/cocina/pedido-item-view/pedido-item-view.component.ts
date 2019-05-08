import { Component, HostListener, OnInit } from "@angular/core";
import { CocinaService } from "src/app/cocina/cocina.service";
import { Pedido } from "src/app/pedido/pedido";
import { Producto } from "src/app/producto/producto";
import { ProductoService } from "src/app/producto/producto.service";
import { Item } from "src/app/pedido/item";

@Component({
  selector: "app-pedido-item-view",
  templateUrl: "./pedido-item-view.component.html",
  styleUrls: ["./pedido-item-view.component.scss"],
})
export class PedidoItemViewComponent implements OnInit {

  items: Item[] = [];
  sinIngredientes: string[] = [];

  screenHeight: number;

  constructor(private cocinaService: CocinaService, private productoService: ProductoService) {
    this.cocinaService.pedido$.subscribe((pedido: Pedido) => {
      this.items = [];
      for (const item of pedido.items) {
        this.items.push(item);
      }
    });
  }

  ngOnInit() {
    this.calculateHeight();
  }

  getSinIngredientes(productoIn: Producto): void {
    this.productoService.getProducto(productoIn.codigo).subscribe((producto: Producto) => {
      this.sinIngredientes = producto.ingredientes.split(",").filter((x) => !productoIn.ingredientes.includes(x));
    });
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
        if (estado == "listo") {
          item_.estado = estado;
        }
        if (estado == "en preparacion" && item_.estado !== "listo") {
          item_.estado = estado;
        }
        if (estado == "en espera" && item_.estado !== "en preparacion" && item_.estado !== "listo") {
          item_.estado = estado;
        }
      }
    }
  }
}
