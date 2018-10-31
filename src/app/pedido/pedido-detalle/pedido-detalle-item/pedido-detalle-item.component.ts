import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../item';
import { PedidoService } from '../../pedido.service';

@Component({
  selector: 'app-pedido-detalle-item',
  templateUrl: './pedido-detalle-item.component.html',
  styleUrls: ['./pedido-detalle-item.component.scss']
})
export class PedidoDetalleItemComponent implements OnInit {

  @Input() item: Item;

  constructor(private pedidoService :PedidoService) {}

  ngOnInit() {  }

  onActualizarCantidad() :void {
    this.item.precioTotal = this.item.precioUnitario * this.item.cantidad;
    this.pedidoService.updateTotales();
  }

  deleteItem(item){
    this.pedidoService.deleteItem(item);
  }
}
