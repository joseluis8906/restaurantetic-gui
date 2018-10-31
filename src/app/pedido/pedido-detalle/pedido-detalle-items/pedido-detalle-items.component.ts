import { Component, OnInit, HostListener } from '@angular/core';
import { PedidoService } from '../../pedido.service';
import { Pedido, PedidoBuilder } from '../../pedido';
import { Item } from '../../item';

@Component({
  selector: 'app-pedido-detalle-items',
  templateUrl: './pedido-detalle-items.component.html',
  styleUrls: ['./pedido-detalle-items.component.scss']
})
export class PedidoDetalleItemsComponent implements OnInit {

  pedido: Pedido;
  screenHeight :number;

  constructor(private pedidoService:PedidoService) { }

  ngOnInit() { 
    this.pedido = new PedidoBuilder().build();
    this.pedido.items = new Array<Item>();
    this.pedidoService.pedido$.subscribe(pedido => {
      this.pedido = pedido ? pedido : new PedidoBuilder().withItems([]).build();
    });
    this.calculateHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResizedDisplay(event?) {
    this.calculateHeight();
  }

  calculateHeight() :void {
    this.screenHeight = window.innerHeight - 54;
  }
}
