import { Component, OnInit } from "@angular/core";
import { Item } from "src/app/pedido/item";
import { Pedido, PedidoBuilder } from "src/app/pedido/pedido";
import { PedidoService } from "src/app/pedido/pedido.service";

@Component({
  selector: "app-pedido-detalle-totales",
  templateUrl: "./pedido-detalle-totales.component.html",
  styleUrls: ["./pedido-detalle-totales.component.scss"],
})
export class PedidoDetalleTotalesComponent implements OnInit {

  pedido: Pedido;

  constructor(private pedidoService: PedidoService) {
    this.pedido = new PedidoBuilder().build();
    this.pedido.items = new Array<Item>();
    this.pedidoService.pedido$.subscribe((pedido) => {
      this.pedido = pedido ? pedido : new PedidoBuilder().withItems([]).build();
      this.calculateTotales();
    });
  }

  ngOnInit() {}

  calculateTotales(): void {
    this.pedido.total = 0;
    for (const item of this.pedido.items) {
      this.pedido.total = this.pedido.total + item.precio;
    }
    this.pedido.total = this.pedido.total;
  }
}
