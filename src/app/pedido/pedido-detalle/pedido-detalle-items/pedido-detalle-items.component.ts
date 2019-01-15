import { Component, HostListener, OnInit } from "@angular/core";
import { Item } from "src/app/pedido/item";
import { Pedido, PedidoBuilder } from "src/app/pedido/pedido";
import { PedidoService } from "src/app/pedido/pedido.service";

@Component({
  selector: "app-pedido-detalle-items",
  templateUrl: "./pedido-detalle-items.component.html",
  styleUrls: ["./pedido-detalle-items.component.scss"],
})
export class PedidoDetalleItemsComponent implements OnInit {

  pedido: Pedido;
  screenHeight: number;

  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
    this.pedido = new PedidoBuilder().build();
    this.pedido.items = new Array<Item>();
    this.pedidoService.pedido$.subscribe((pedido) => {
      this.pedido = pedido ? pedido : new PedidoBuilder().withItems([]).build();
    });
    this.calculateHeight();
  }

  @HostListener("window:resize", ["$event"])
  onResizedDisplay(event?) {
    this.calculateHeight();
  }

  calculateHeight(): void {
    this.screenHeight = window.innerHeight - 54;
  }
}
