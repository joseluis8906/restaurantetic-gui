import { Injectable } from '@angular/core';
import { Pedido } from './pedido';
import { PEDIDOS } from './mockPedidos';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor() { }

  getPedidos() :Pedido[] {
    return PEDIDOS;
  }

  getPedido(mesa:string){
    for(let pedido of PEDIDOS){
      if(pedido.mesa === mesa && !pedido.pago){
        return pedido;
      }
    }
    return null;
  }

  addPedido(pedido:Pedido) :void {
    PEDIDOS.push(pedido);
  }

  getSigCodigo() :string {
    return '000' + (PEDIDOS.length + 1).toString();
  }
}
