import { Component, HostListener, OnInit, OnDestroy } from "@angular/core";
import { Pedido } from "src/app/pedido/pedido";
import { PedidoService, PedidoServiceActions } from "src/app/pedido/pedido.service";
import { Subscription } from "rxjs";
import { MqttService, Topic } from "src/app/utils/mqtt.service";
import { Message } from "paho-mqtt";

@Component({
  selector: "app-pedido-view",
  templateUrl: "./pedido-view.component.html",
  styleUrls: ["./pedido-view.component.scss"],
})
export class PedidoViewComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  pedidos: Pedido[] = [];
  screenHeight: number;
  active: String = null;

  constructor(private pedidoService: PedidoService, private mqttService: MqttService) {
    this.subscriptions = new Subscription();

    this.mqttService.subscribe(Topic.Servicio);
    this.subscriptions.add(this.mqttService.message$.subscribe((msg: Message) => this.handleMessage(msg)));
  }

  ngOnInit() {
    this.calculateHeight();
    this.cargarPedidos();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  cargarPedidos(): void {
    this.subscriptions.add(this.pedidoService.getPedidos().subscribe((pedidos: Pedido[]) => {
      for (const pedido of pedidos) {
        this.pedidos.push(pedido);
      }
    }));
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

  handleMessage(msg: Message): void {
    const msg_: any = JSON.parse(msg.payloadString);
    console.log(msg_);
    if (msg_.method === PedidoServiceActions.ChangeItemState) {
      return;
    }
    let pedido: Pedido = null;
    this.subscriptions.add(this.pedidoService.getPedidos().subscribe((pedidos: Array<Pedido>) => {
      pedidos.forEach((it: Pedido) => {
        if (it.codigo === msg_.pedido) {
          pedido = it;
          return;
        }
      });

      this.pedidos.forEach((it: Pedido, index: number) => {
        if (it.codigo === pedido.codigo) {
          this.pedidos[index] = pedido;
          return;
        }
      });

      if (this.active === pedido.codigo) {
        this.pedidoService.changePedido(pedido);
      }
    }));
  }
}
