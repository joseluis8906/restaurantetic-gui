import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Pedido } from "src/app/pedido/pedido";
import { PedidoService } from "src/app/pedido/pedido.service";

@Component({
  selector: "app-pedido-detalle-caja",
  templateUrl: "./pedido-detalle-caja.component.html",
  styleUrls: ["./pedido-detalle-caja.component.scss"],
})
export class PedidoDetalleCajaComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  pedidos: Pedido[] = [];
  pedido: Pedido;

  screenHeight: number;

  constructor(private pedidoService: PedidoService) {
    this.subscriptions = new Subscription();
  }

  ngOnInit() {
    this.calculateHeight();
    this.getPedidos();
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

  onCreatePedido(): void {
    this.pedidoService.createPedido(null);
  }

  onChangePedido(pedido: Pedido) {
    this.pedidoService.changePedido(pedido);
    this.pedido = pedido;
  }

  getPedidos() {
    this.subscriptions.add(this.pedidoService.getPedidos().subscribe((pedidos: Array<Pedido>) => {
      this.pedidos = [];
      for (const pedido of pedidos) {
        if (!pedido.mesa) {
          this.pedidos.push(pedido);
        }
      }
    }));
  }
}
