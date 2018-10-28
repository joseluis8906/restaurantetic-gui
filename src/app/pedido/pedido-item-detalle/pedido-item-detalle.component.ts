import { Component, OnInit, Input } from '@angular/core';
import { Item, ItemBuilder } from '../item';
import { ProductoService } from 'src/app/producto/producto.service';
import { Producto } from 'src/app/producto/producto';

@Component({
  selector: 'app-pedido-item-detalle',
  templateUrl: './pedido-item-detalle.component.html',
  styleUrls: ['./pedido-item-detalle.component.scss']
})
export class PedidoItemDetalleComponent implements OnInit {

  @Input() item: Item;

  constructor() { }

  ngOnInit() {  }

  onActualizarCantidad() :void {
    this.item.precioTotal = this.item.precioUnitario * this.item.cantidad;
  }  
}
