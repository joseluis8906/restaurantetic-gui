import { Component, OnInit, Output, Input, EventEmitter, HostListener } from '@angular/core';
import { Pedido } from '../../pedido';
import { PedidoService } from '../../pedido.service';

@Component({
  selector: 'app-pedido-detalle-mesa',
  templateUrl: './pedido-detalle-mesa.component.html',
  styleUrls: ['./pedido-detalle-mesa.component.scss']
})
export class PedidoDetalleMesaComponent implements OnInit {

  pedido: Pedido;
  screenHeight: number;

  mesas: Mesa[] = [
    {numero: '01', active: false},
    {numero: '02', active: false},
    {numero: '03', active: false},
    {numero: '04', active: false},
    {numero: '05', active: false},
    {numero: '06', active: false},
    {numero: '07', active: false},
    {numero: '08', active: false},
    {numero: '09', active: false},
    {numero: '10', active: false},
    {numero: '11', active: false},
    {numero: '12', active: false},
    {numero: '13', active: false},
    {numero: '14', active: false},
    {numero: '15', active: false},
    {numero: '16', active: false},
    {numero: '17', active: false},
    {numero: '18', active: false}
  ];

  constructor(private pedidoService: PedidoService) {
    this.pedidoService.pedido$.subscribe((pedido) => {
      if(pedido !== null && pedido.codigo.startsWith('MESA')) {
        this.pedido = pedido;
      }
      this.calcularMesasOcupadas();
    });
  }

  ngOnInit() { 
    this.calculateHeight();
    this.calcularMesasOcupadas();
  }

  onChangeMesa(mesa:Mesa) :void {
    this.pedidoService.changePedidoMesa(mesa.numero);
  }

  @HostListener('window:resize', ['$event'])
  onResizedDisplay(event?) {
    this.calculateHeight();
  }

  calculateHeight() :void {
    this.screenHeight = window.innerHeight - 54;
  }

  calcularMesasOcupadas() :void {
    for(let mesa of this.mesas) {
      mesa.active = false;
    }
    this.pedidoService.getPedidosMesa().subscribe((pedidos:Pedido[]) => {
      for(let mesa of this.mesas) {
        for(let pedido of pedidos) {
          if(pedido.mesa === mesa.numero){
            mesa.active = true;
          }
        }
      }
    })
  }
}

class Mesa {
  numero: string;
  active: boolean;
}
