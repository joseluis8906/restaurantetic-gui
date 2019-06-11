import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  } from "@angular/core";
import { Subscription } from "rxjs";
import { Item, ItemEstados } from "src/app/pedido/item";
import { Pedido, PedidoBuilder } from "src/app/pedido/pedido";
import { PedidoService } from "src/app/pedido/pedido.service";
import { NotificationService, MessageType } from "src/app/notification/notification.service";

@Component({
  selector: "app-pedido-detalle",
  templateUrl: "./pedido-detalle.component.html",
  styleUrls: ["./pedido-detalle.component.scss"],
})
export class PedidoDetalleComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  screenHeight: number;
  pedido: Pedido;

  constructor(private pedidoService: PedidoService, private notificationService: NotificationService) {
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
    let canEliminar = true;
    for (const item_ of this.pedido.items) {
      if (item_.estado !== ItemEstados.EnEspera) {
        canEliminar = false;
      }
    }
    if (canEliminar) {
      this.pedidoService.deletePedido();
    } else {
      this.notificationService.showMessage("Pedido en proceso", MessageType.Error);
    }
  }
}
