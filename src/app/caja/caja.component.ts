import { Component, OnInit, OnDestroy } from "@angular/core";
import { Pedido } from "src/app/pedido/pedido";
import { PedidoService, PedidoServiceActions } from "src/app/pedido/pedido.service";
import { Subscription } from "rxjs";
import { ItemEstados, Item } from "../pedido/item";
import { MqttService, Topic } from "../utils/mqtt.service";
import { Message } from "paho-mqtt";

@Component({
  selector: "app-caja",
  templateUrl: "./caja.component.html",
  styleUrls: ["./caja.component.scss"],
})
export class CajaComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  pedidos: Array<Pedido>;

  constructor(private pedidoService: PedidoService, private mqttService: MqttService) {
    this.subscriptions = new Subscription();
    this.pedidos = [];

    this.subscriptions.add(this.pedidoService.pedidos$.subscribe((pedidos: Array<Pedido>) => {
      this.pedidos = pedidos;
    }));
    this.pedidoService.fetchPedidos();

    this.mqttService.subscribe(Topic.Servicio);
    this.subscriptions.add(this.mqttService.message$.subscribe((msg: Message) => this.handleMessages(JSON.parse(msg.payloadString))));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onPagar(pedido: Pedido): void {
    this.pedidoService.pagar(pedido);
  }

  calcularDeshabilitado(pedido: Pedido): boolean {
    for (const item of pedido.items) {
      if (item.estado !== ItemEstados.Listo) {
        return true;
      }
    }

    return false;
  }

  handleMessages(msg: any): void {
    switch (msg.method) {
      case PedidoServiceActions.ChangeItemState:
        this.handleChangeItemState(msg);
        break;
      default:
        break;
    }
  }

  handleChangeItemState(msg: any): void {
    this.pedidos.forEach((it: Pedido) => {
      if (it.codigo === msg.pedido) {
        it.items.forEach((itemIt: Item, index: number) => {
          if (itemIt.numero === msg.item.numero) {
            it.items[index] = msg.item;
          }
        });
      }
    });
  }
}
