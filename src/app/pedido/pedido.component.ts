import { Component, OnInit, OnDestroy } from "@angular/core";
import { MqttService, Topic } from "../utils/mqtt.service";
import { NotificationService, MessageType } from "../notification/notification.service";
import { Subscription } from "rxjs";
import { Message } from "paho-mqtt";
import { PedidoServiceActions } from "./pedido.service";
import { ItemEstados } from "./item";

@Component({
  selector: "app-pedido",
  templateUrl: "./pedido.component.html",
  styleUrls: ["./pedido.component.scss"],
})
export class PedidoComponent implements OnInit, OnDestroy {

  subscriptions: Subscription;

  constructor(private mqttService: MqttService, private notificationService: NotificationService) {
    this.subscriptions = new Subscription();
    
    this.mqttService.subscribe(Topic.Servicio);
    this.subscriptions.add(this.mqttService.message$.subscribe((msg: Message) => this.handleMessages(JSON.parse(msg.payloadString))));
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  handleMessages(msg: any): void {
    if (msg.method === PedidoServiceActions.ChangeItemState) {
      if (msg.item.estado === ItemEstados.Listo) {
        this.notificationService.showMessage(`Pedido ${msg.pedido} - item ${msg.item.producto.codigo} listo.`, MessageType.Info);
      }
    }
  }
}
