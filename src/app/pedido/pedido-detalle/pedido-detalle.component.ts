import { Component, HostListener, OnInit } from "@angular/core";
import { PedidoService } from "src/app/pedido/pedido.service";

@Component({
  selector: "app-pedido-detalle",
  templateUrl: "./pedido-detalle.component.html",
  styleUrls: ["./pedido-detalle.component.scss"],
})
export class PedidoDetalleComponent implements OnInit {

  screenHeight: number;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {
    this.calculateHeight();
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
