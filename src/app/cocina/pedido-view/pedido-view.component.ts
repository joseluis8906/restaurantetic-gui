import { Component, HostListener, OnInit } from "@angular/core";
import { Pedido } from "src/app/pedido/pedido";
import { PedidoService } from "src/app/pedido/pedido.service";

@Component({
  selector: "app-pedido-view",
  templateUrl: "./pedido-view.component.html",
  styleUrls: ["./pedido-view.component.scss"],
})
export class PedidoViewComponent implements OnInit {

  pedidos: Pedido[] = [];
  screenHeight: number;
  active: String = null;


  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
    this.calculateHeight();
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pedidoService.getPedidos().subscribe((pedidos: Pedido[]) => {
      for (const pedido of pedidos) {
        this.pedidos.push(pedido);
      }
    });
  }

  changePedido(pedido: Pedido): void {
    this.active = pedido.codigo;
    this.pedidoService.changePedido(pedido);
  }

  calculateHeight(): void {
    this.screenHeight = window.innerHeight - 54;
  }

  @HostListener("window:resize", ["$event"])
  onResizedDisplay(event?) {
    this.calculateHeight();
  }
}
