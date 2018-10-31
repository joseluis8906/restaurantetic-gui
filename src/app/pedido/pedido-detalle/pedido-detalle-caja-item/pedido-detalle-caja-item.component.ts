import { Component, OnInit, Input } from '@angular/core';
import { Pedido, PedidoBuilder } from '../../pedido';
import { PedidoService } from '../../pedido.service';

@Component({
  selector: 'app-pedido-detalle-caja-item',
  templateUrl: './pedido-detalle-caja-item.component.html',
  styleUrls: ['./pedido-detalle-caja-item.component.scss']
})
export class PedidoDetalleCajaItemComponent implements OnInit {

  @Input() pedido :Pedido;
  active :boolean;

  constructor(private pedidoService :PedidoService) {
    this.active = false;
    this.pedidoService.pedido$.subscribe(pedido => {
      this.changeActive(pedido ? pedido : new PedidoBuilder().withCodigo(null).build());
    })
  }

  ngOnInit() { }

  changeActive(pedido: Pedido) {
    if(this.pedido.codigo === pedido.codigo){
      this.active = true;
    } else {
      this.active = false;
    }
  }
}
