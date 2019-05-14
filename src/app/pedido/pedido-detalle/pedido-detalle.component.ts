import { Component, HostListener, OnInit, OnDestroy } from "@angular/core";
import { PedidoService } from "src/app/pedido/pedido.service";
import { Pedido, PedidoBuilder } from "src/app/pedido/pedido";
import { Item } from "src/app/pedido/item";
import { Subscription } from "rxjs";

@Component({
  selector: "app-pedido-detalle",
  templateUrl: "./pedido-detalle.component.html",
  styleUrls: ["./pedido-detalle.component.scss"],
})
export class PedidoDetalleComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  screenHeight: number;
  pedido: Pedido;

  constructor(private pedidoService: PedidoService) {
    this.subscriptions = new Subscription();
    this.pedido = new PedidoBuilder().build();
    this.pedido.items = new Array<Item>();
    this.subscriptions.add(this.pedidoService.pedido$.subscribe((pedido) => {
      this.pedido = pedido ? pedido : new PedidoBuilder().withItems([]).build();
    }));
  }

  ngOnInit() {
    this.calculateHeight();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  @HostListener("window:resize", ["$event"])
  onResizedDisplay(event?) {
    this.calculateHeight();
  }

  calculateHeight(): void {
    this.screenHeight = window.innerHeight - 54;
  }

  deletePedido() {
    this.pedidoService.deletePedido();
  }
}
