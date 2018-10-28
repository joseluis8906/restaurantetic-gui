import { Component, OnInit } from '@angular/core';
import { Pedido, PedidoBuilder } from './pedido';
import { Item } from './item';
import { PedidoService } from './pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  pedido: Pedido;

  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
    this.pedido = new Pedido();
    this.pedido.items = [];
  }

  onCheckPedido(mesa) {
    if(!this.pedido){
      this.pedido = new PedidoBuilder()
        .withCodigo(this.pedidoService.getSigCodigo())
        .withFecha(Date.now())
        .withItems([])
        .withMesa(mesa)
        .withSubtotal(0)
        .withIva(0)
        .withTotal(0)
        .build();
      console.log('pedido created');
    }
  }

  onAgregarItem(item: Item) {
    item.numero = this.pedido.items.length + 1;
    this.pedido.items.push(item);
  }
}