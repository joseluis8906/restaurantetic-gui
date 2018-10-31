import { Component, OnInit } from '@angular/core';
import { Pedido, PedidoBuilder } from '../../pedido';
import { PedidoService } from '../../pedido.service';
import { Item } from '../../item';

@Component({
  selector: 'app-pedido-detalle-totales',
  templateUrl: './pedido-detalle-totales.component.html',
  styleUrls: ['./pedido-detalle-totales.component.scss']
})
export class PedidoDetalleTotalesComponent implements OnInit {

  pedido: Pedido;

  constructor(private pedidoService :PedidoService) {
    this.pedido = new PedidoBuilder().build();
    this.pedido.items = new Array<Item>();
    this.pedidoService.pedido$.subscribe(pedido => {
      this.pedido = pedido ? pedido : new PedidoBuilder().withItems([]).withSubtotal(null).build();
      this.calculateTotales();
    });
  }

  ngOnInit() {}

  calculateTotales() :void {
    this.pedido.subtotal = 0;
    this.pedido.iva = 0;
    this.pedido.total = 0;
    for(let item of this.pedido.items){  
      this.pedido.subtotal = this.pedido.subtotal + item.precioTotal;  
    } 
    this.pedido.iva = this.pedido.subtotal * 0.19;
    this.pedido.total = this.pedido.subtotal + this.pedido.iva;
  }
}