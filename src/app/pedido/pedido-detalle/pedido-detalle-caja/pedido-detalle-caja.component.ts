import { Component, HostListener, OnInit } from "@angular/core";
import { Pedido } from "src/app/pedido/pedido";
import { PedidoService } from "src/app/pedido/pedido.service";

@Component({
  selector: "app-pedido-detalle-caja",
  templateUrl: "./pedido-detalle-caja.component.html",
  styleUrls: ["./pedido-detalle-caja.component.scss"],
})
export class PedidoDetalleCajaComponent implements OnInit {

  pedidos: Pedido[] = [];

  screenHeight: number;

  constructor(private pedidoService: PedidoService) {
    this.pedidoService.pedido$.subscribe(() => {
      this.pedidoService.getPedidosCaja().subscribe((pedidos) => {
        this.pedidos = pedidos;
      });
    });
  }

  ngOnInit() {
    this.calculateHeight();
    this.getPedidos();
  }

  @HostListener("window:resize", ["$event"])
  onResizedDisplay(event?) {
    this.calculateHeight();
  }

  calculateHeight(): void {
    this.screenHeight = window.innerHeight - 54;
  }

  onCreatePedido(): void {
    this.pedidoService.createPedidoCaja();
  }

  onChangePedido(pedido: Pedido) {
    this.pedidoService.changePedidoCaja(pedido.codigo);
  }

  getPedidos() {
    this.pedidoService.getPedidosCaja()
      .subscribe((pedidos) => {
        this.pedidos = pedidos;
      });
  }
}
