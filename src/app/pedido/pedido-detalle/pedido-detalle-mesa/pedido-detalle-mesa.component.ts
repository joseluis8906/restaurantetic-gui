import { Component, HostListener, OnInit } from "@angular/core";
import { Pedido } from "src/app/pedido/pedido";
import { PedidoService } from "src/app/pedido/pedido.service";

@Component({
  selector: "app-pedido-detalle-mesa",
  templateUrl: "./pedido-detalle-mesa.component.html",
  styleUrls: ["./pedido-detalle-mesa.component.scss"],
})
export class PedidoDetalleMesaComponent implements OnInit {

  pedido: Pedido;
  screenHeight: number;

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
    this.pedido = new Pedido();
    this.pedidoService.pedido$.subscribe((pedido) => {
      if (pedido === null) {
        this.pedido = new Pedido();
      } else {
        this.pedido = pedido;
      }
      this.calcularMesasOcupadas();
    });
  }

  ngOnInit() {
    this.calculateHeight();
    this.calcularMesasOcupadas();
  }

  onChangeMesa(mesa: Mesa): void {
    this.pedidoService.changePedidoFromMesa(mesa.numero);
    for (const mesa_ of this.mesas) {
      mesa_.actual = false;
    }
    mesa.actual = true;
  }

  @HostListener("window:resize", ["$event"])
  onResizedDisplay(event?) {
    this.calculateHeight();
  }

  calculateHeight(): void {
    this.screenHeight = window.innerHeight - 54;
  }

  calcularMesasOcupadas(): void {
    this.pedidoService.getPedidos().subscribe((pedidos: Pedido[]) => {
      for (const mesa of this.mesas) {
        mesa.active = false;
        for (const pedido of pedidos) {
          if (pedido.mesa === mesa.numero) {
            mesa.active = true;
          }
        }
        if (this.pedido !== null && this.pedido.mesa === mesa.numero){
          mesa.actual = true;
        } else {
          mesa.actual = false;
        }
      }
    });
  }
}

class Mesa {
  numero: string;
  active: boolean;
  actual: boolean;
}
