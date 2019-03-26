import { Item } from "./item";

export class Pedido {
  codigo: string;
  fecha: number;
  mesa: string;
  items: Item[];
  iva: number;
  subtotal: number;
  total: number;
  pago: boolean;
}

export class PedidoBuilder {
  pedido: Pedido;

  constructor () {
    this.pedido = new Pedido();
  }
  withCodigo(codigo:string) :PedidoBuilder {
    this.pedido.codigo = codigo;
    return this;
  }
  withFecha(fecha:number) :PedidoBuilder {
    this.pedido.fecha = fecha;
    return this;
  }
  withMesa(mesa:string) :PedidoBuilder {
    this.pedido.mesa = mesa;
    return this;
  }
  withItems(items:Item[]) :PedidoBuilder {
    this.pedido.items = items;
    return this;
  }
  withSubtotal(subtotal:number) :PedidoBuilder {
    this.pedido.subtotal = subtotal;
    return this;
  }
  withIva(iva:number) :PedidoBuilder {
    this.pedido.iva = iva;
    return this;
  }
  withTotal(total:number) :PedidoBuilder {
    this.pedido.total = total;
    return this;
  }
  withPago(pago:boolean) :PedidoBuilder {
    this.pedido.pago = pago;
    return this;
  }
  build() :Pedido {
    return this.pedido;
  }
}
