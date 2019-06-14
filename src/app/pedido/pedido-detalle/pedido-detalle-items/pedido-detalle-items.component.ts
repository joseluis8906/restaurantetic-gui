import { Component, HostListener, OnInit, OnDestroy } from "@angular/core";
import { Item } from "src/app/pedido/item";
import { Pedido, PedidoBuilder } from "src/app/pedido/pedido";
import { PedidoService, PedidoServiceActions } from "src/app/pedido/pedido.service";
import { Subscription } from "rxjs";
import { MqttService, Topic } from "src/app/utils/mqtt.service";
import { Message } from "paho-mqtt";

@Component({
  selector: "app-pedido-detalle-items",
  templateUrl: "./pedido-detalle-items.component.html",
  styleUrls: ["./pedido-detalle-items.component.scss"],
})
export class PedidoDetalleItemsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  pedido: Pedido;
  height: number;

  constructor(private pedidoService: PedidoService, private mqttService: MqttService) {
    this.subscriptions = new Subscription();

    this.mqttService.subscribe(Topic.Servicio);
    this.subscriptions.add(this.mqttService.message$.subscribe((msg: Message) => this.handleMessages(msg)));
  }

  ngOnInit() {
    this.pedido = new PedidoBuilder().build();
    this.pedido.items = new Array<Item>();
    this.subscriptions.add(this.pedidoService.pedido$.subscribe((pedido) => {
      this.pedido = pedido ? pedido : new PedidoBuilder().withItems([]).build();
    }));
    this.calculateHeight();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  @HostListener("window:orientationchange", ["$event"])
  onChangeOrientation(event?) {
    this.calculateHeight();
  }

  @HostListener("window:resize", ["$event"])
  onResizedDisplay(event?) {
    this.calculateHeight();
  }

  calculateHeight(): void {
    const width: number = window.innerWidth;
    const height: number = window.innerHeight;
    const orientation: string = width > height ? "landscape" : "portrait";
    if (orientation === "landscape") {
      const screenHeight = window.innerHeight;
      const height: number = screenHeight - (48 + 48 + 54);
      this.height = height * 0.7;
    } else {
      const screenWidth = window.innerWidth;
      const height: number = screenWidth - (48 + 48 + 54);
      this.height = height * 0.7;
    }
  }

  handleMessages(msg: Message): void {
    const msg_: any = JSON.parse(msg.payloadString);
    switch (msg_.method) {
      case PedidoServiceActions.ChangeItemState:
        console.log("changeItemState");
        this.handleChangeItemState(msg_);
        break;
      default:
        break;
    }
  }

  handleChangeItemState(msg: any): void {
    if (this.pedido.codigo === msg.pedido) {
      this.pedido.items.forEach((it: Item, index: number) => {
        if (it.numero === msg.item.numero) {
          this.pedido.items[index] = msg.item;
        }
      });
    }
  }
}
