import { Component, HostListener, OnInit, OnDestroy } from "@angular/core";
import { Pedido } from "src/app/pedido/pedido";
import { Producto } from "src/app/producto/producto";
import { ProductoService } from "src/app/producto/producto.service";
import { Item, ItemEstados } from "src/app/pedido/item";
import { PedidoService } from "src/app/pedido/pedido.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-pedido-item-view",
  templateUrl: "./pedido-item-view.component.html",
  styleUrls: ["./pedido-item-view.component.scss"],
})
export class PedidoItemViewComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  items: Item[] = [];
  sinIngredientes: string[] = [];

  screenHeight: number;

  constructor(private pedidoService: PedidoService, private productoService: ProductoService) {
    this.subscriptions = new Subscription();

    this.subscriptions.add(this.pedidoService.pedido$.subscribe((pedido: Pedido) => {
      this.items = [];
      for (const item of pedido.items) {
        this.items.push(item);
      }
    }));
  }

  ngOnInit() {
    this.calculateHeight();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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
        if (estado === ItemEstados.Listo && item_.estado !== ItemEstados.Listo) {
          item_.estado = estado;
          this.subscriptions.add(this.pedidoService.cambiarEstadoItem(item_).subscribe(() => console.log("actualizado")));
        }
        if (estado === ItemEstados.EnPreparacion && item_.estado !== ItemEstados.Listo) {
          item_.estado = estado;
          this.subscriptions.add(this.pedidoService.cambiarEstadoItem(item_).subscribe(() => console.log("actualizado")));
        }
        if (estado === ItemEstados.EnEspera && item_.estado !== ItemEstados.EnPreparacion && item_.estado !== ItemEstados.Listo) {
          item_.estado = estado;
          this.subscriptions.add(this.pedidoService.cambiarEstadoItem(item_).subscribe(() => console.log("actualizado")));
        }
      }
    }
  }
}
