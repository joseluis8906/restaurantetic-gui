import { Component, HostListener, OnInit, OnDestroy } from "@angular/core";
import { Pedido, PedidoBuilder } from "src/app/pedido/pedido";
import { PedidoService } from "src/app/pedido/pedido.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-pedido-detalle-mesa",
  templateUrl: "./pedido-detalle-mesa.component.html",
  styleUrls: ["./pedido-detalle-mesa.component.scss"],
})
export class PedidoDetalleMesaComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  pedido: Pedido;
  height: number;
  mesas: Mesa[] = [
    {numero: "01", active: false, actual: false},
    {numero: "02", active: false, actual: false},
    {numero: "03", active: false, actual: false},
    {numero: "04", active: false, actual: false},
    {numero: "05", active: false, actual: false},
    {numero: "06", active: false, actual: false},
    {numero: "07", active: false, actual: false},
    {numero: "08", active: false, actual: false},
    {numero: "09", active: false, actual: false},
    {numero: "10", active: false, actual: false},
    {numero: "11", active: false, actual: false},
    {numero: "12", active: false, actual: false},
    {numero: "13", active: false, actual: false},
    {numero: "14", active: false, actual: false},
    {numero: "15", active: false, actual: false},
    {numero: "16", active: false, actual: false},
    {numero: "17", active: false, actual: false},
    {numero: "18", active: false, actual: false},
  ];

  constructor(private pedidoService: PedidoService) {
    this.subscriptions = new Subscription();
    this.pedido = new Pedido();
    this.subscriptions.add(this.pedidoService.pedido$.subscribe((pedido) => {
      if (pedido === null) {
        this.pedido = new Pedido();
      } else {
        this.pedido = pedido;
      }
      this.calcularMesasOcupadas();
    }));
  }

  ngOnInit() {
    this.calculateHeight();
    this.calcularMesasOcupadas();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onChangePedido(mesa: Mesa): void {
    this.subscriptions.add(this.pedidoService.getPedidos().subscribe((pedidos: Pedido[]) => {
      for (const pedido of pedidos) {
        for (const mesa_ of this.mesas) {
          mesa_.actual = false;
          if (pedido.mesa === mesa.numero) {
            this.pedidoService.changePedido(pedido);
            return;
          }
        }
      }
      mesa.actual = true;
      this.pedidoService.createPedido(mesa.numero);
    }));
  }

  @HostListener("window:resize", ["$event"])
  onResizedDisplay(event?) {
    this.calculateHeight();
  }

  @HostListener("window:orientationchange", ["$event"])
  onChangeOrientation(event?) {
    this.calculateHeight();
  }

  calculateHeight(): void {
    const width: number = window.innerWidth;
    const height: number = window.innerHeight;
    const orientation: string = width > height ? "landscape" : "portrait";
    if (orientation === "landscape") {
      const screenHeight = window.innerHeight;
      const height: number = screenHeight - (48 + 48 + 54);
      this.height = height * 0.3;
    } else {
      const screenWidth = window.innerWidth;
      const height: number = screenWidth - (48 + 48 + 54);
      this.height = height * 0.3;
    }
  }

  calcularMesasOcupadas(): void {
    this.subscriptions.add(this.pedidoService.getPedidos().subscribe((pedidos: Pedido[]) => {
      if (pedidos === null) {
        return;
      }
      for (const mesa of this.mesas) {
        mesa.active = false;
        for (const pedido of pedidos) {
          if (pedido.mesa === mesa.numero) {
            mesa.active = true;
          }
        }
        if (this.pedido !== null && this.pedido.mesa === mesa.numero) {
          mesa.actual = true;
        } else {
          mesa.actual = false;
        }
      }
    }));
  }
}

class Mesa {
  numero: string;
  active: boolean;
  actual: boolean;
}
