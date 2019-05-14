import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Pedido, PedidoBuilder } from "src/app/pedido/pedido";
import { PedidoService } from "src/app/pedido/pedido.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-pedido-detalle-caja-item",
  templateUrl: "./pedido-detalle-caja-item.component.html",
  styleUrls: ["./pedido-detalle-caja-item.component.scss"]
})
export class PedidoDetalleCajaItemComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  @Input() pedido: Pedido;
  active: boolean;

  constructor(private pedidoService: PedidoService) {
    this.subscription = new Subscription();
    this.active = false;
    this.subscription.add(this.pedidoService.pedido$.subscribe((pedido) => {
      this.changeActive(pedido ? pedido : new PedidoBuilder().withCodigo(null).build());
    }));
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeActive(pedido: Pedido) {
    if (this.pedido.codigo === pedido.codigo) {
      this.active = true;
    } else {
      this.active = false;
    }
  }
}
