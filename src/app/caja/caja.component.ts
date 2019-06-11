import { Component, OnInit, OnDestroy } from "@angular/core";
import { Pedido } from "src/app/pedido/pedido";
import { PedidoService } from "src/app/pedido/pedido.service";
import { Subscription } from "rxjs";
import { ItemEstados } from "../pedido/item";

@Component({
  selector: "app-caja",
  templateUrl: "./caja.component.html",
  styleUrls: ["./caja.component.scss"],
})
export class CajaComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  pedidos: Array<Pedido>;

  constructor(private pedidoService: PedidoService) {
    this.subscriptions = new Subscription();
    this.pedidos = [];
    this.pedidoService.getPedidos().subscribe((pedidos: Array<Pedido>) => {
      this.pedidos = pedidos;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onPagar(pedido: Pedido): void {
    this.subscriptions.add(this.pedidoService.pagar(pedido).subscribe((_) => {
      this.pedidoService.getPedidos().subscribe((pedidos: Array<Pedido>) => {
        this.pedidos = pedidos;
      });
    }));
  }

  calcularDeshabilitado(pedido: Pedido): boolean {
    for (const item of pedido.items) {
      if (item.estado !== ItemEstados.Listo) {
        return true;
      }
    }

    return false;
  }
}
