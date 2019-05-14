import { Component, HostListener, OnInit, OnDestroy } from "@angular/core";
import { Pedido } from "src/app/pedido/pedido";
import { PedidoService } from "src/app/pedido/pedido.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-pedido-detalle-caja",
  templateUrl: "./pedido-detalle-caja.component.html",
  styleUrls: ["./pedido-detalle-caja.component.scss"],
})
export class PedidoDetalleCajaComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  pedidos: Pedido[] = [];

  screenHeight: number;

  constructor(private pedidoService: PedidoService) {
    this.subscriptions = new Subscription();

    this.subscriptions.add(this.pedidoService.pedido$.subscribe(() => {
      this.pedidoService.getPedidos().subscribe((pedidos) => {
        this.getPedidos();
      });
    }));
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
  }

  getPedidos() {
    this.subscriptions.add(this.pedidoService.getPedidos().subscribe((pedidos) => {
      this.pedidos = [];
      for (const pedido of pedidos){
        console.log(pedido);
        if (!pedido.mesa) {
          this.pedidos.push(pedido);
        }
      }
    }));
  }
}
