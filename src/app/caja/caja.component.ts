import { Component, OnInit } from "@angular/core";
import { Pedido } from "src/app/pedido/pedido";
import { PedidoService } from "src/app/pedido/pedido.service";

@Component({
  selector: "app-caja",
  templateUrl: "./caja.component.html",
  styleUrls: ["./caja.component.scss"],
})
export class CajaComponent implements OnInit {

  pedidos: Array<Pedido>;

  constructor(private pedidoService: PedidoService) {
    this.pedidos = [];
    this.pedidoService.getPedidos().subscribe((pedidos: Array<Pedido>) => {
      this.pedidos = pedidos;
    });
  }

  ngOnInit() {
  }

  onPagar(pedido: Pedido): void {
    this.pedidoService.pagar(pedido).subscribe((_) => {
      this.pedidoService.getPedidos().subscribe((pedidos: Array<Pedido>) => {
        this.pedidos = pedidos;
      });
    });
  }
}
