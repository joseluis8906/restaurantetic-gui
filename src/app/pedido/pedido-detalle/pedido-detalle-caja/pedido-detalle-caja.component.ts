import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Pedido } from "src/app/pedido/pedido";
import { PedidoService } from "src/app/pedido/pedido.service";
import { MqttService } from "src/app/utils/mqtt.service";

@Component({
  selector: "app-pedido-detalle-caja",
  templateUrl: "./pedido-detalle-caja.component.html",
  styleUrls: ["./pedido-detalle-caja.component.scss"],
})
export class PedidoDetalleCajaComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  pedidos: Pedido[] = [];
  pedido: Pedido;

  height: number;

  constructor(private pedidoService: PedidoService) {
    this.pedidos = [];
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.pedidoService.pedido$.subscribe((pedido: Pedido) => {
      this.getPedidos();
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

  @HostListener("window:orientationchange", ["$event"])
  onChangeOrientation(event?) {
    this.calculateHeight();
  }

  calculateHeight(): void {
    const width: number = window.innerWidth;
    const height: number = window.innerHeight;
    const orientation: string = width > height ? "landscape" : "portrait";
    if (orientation === "landscape") {
      const screenHeight = window.innerHeight;
      const height: number = screenHeight - (48 + 48 + 54);
      this.height = height * 0.3;
    } else {
      const screenWidth = window.innerWidth;
      const height: number = screenWidth - (48 + 48 + 54);
      this.height = height * 0.3;
    }
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
