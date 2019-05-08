import { Item } from "./item";

export class Pedido {
  codigo: string;
  fecha: string;
  mesa: string;
  items: Item[];
  total: number;
  pago: boolean;
}

export class PedidoBuilder {
  private pedido: Pedido;

  constructor() {
    this.pedido = new Pedido();
  }

  public withCodigo(codigo: string): PedidoBuilder {
    this.pedido.codigo = codigo;
    return this;
  }

  public withFecha(fecha: string): PedidoBuilder {
    this.pedido.fecha = fecha;
    return this;
  }

  public withMesa(mesa: string): PedidoBuilder {
    this.pedido.mesa = mesa;
    return this;
  }

  public withItems(items: Item[]): PedidoBuilder {
    this.pedido.items = items;
    return this;
  }

  public withTotal(total: number): PedidoBuilder {
    this.pedido.total = total;
    return this;
  }

  public withPago(pago: boolean): PedidoBuilder {
    this.pedido.pago = pago;
    return this;
  }

  public build(): Pedido {
    return this.pedido;
  }
}
