import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Item } from "src/app/pedido/item";
import { Pedido, PedidoBuilder } from "src/app/pedido/pedido";
import { PedidoService } from "src/app/pedido/pedido.service";

@Component({
  selector: "app-pedido-detalle-totales",
  templateUrl: "./pedido-detalle-totales.component.html",
  styleUrls: ["./pedido-detalle-totales.component.scss"],
})
export class PedidoDetalleTotalesComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  pedido: Pedido;

  constructor(private pedidoService: PedidoService) {
    this.subscriptions = new Subscription();
    this.pedido = new PedidoBuilder().build();
    this.pedido.items = new Array<Item>();
    this.subscriptions.add(this.pedidoService.pedido$.subscribe((pedido: Pedido) => {
      console.log(pedido);
      this.pedido = pedido ? pedido : new PedidoBuilder().withItems([]).build();
      this.calculateTotales();
    }));
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  calculateTotales(): void {
    let total = 0;
    for (const item of this.pedido.items) {
      total = this.pedido.total + item.precio;
    }
    this.pedido.total = total;
  }
}
