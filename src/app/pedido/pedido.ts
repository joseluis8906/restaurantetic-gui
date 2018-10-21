import { Item } from "./item";

export class Pedido {
  codigo: string = null;
  fecha: number = null;
  mesa: string = null;
  cliente: string = null;
  items: Item[] = null;
  subtotal: number = null;
  iva: number = null;
  total: number = null;
}