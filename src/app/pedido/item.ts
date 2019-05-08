import { Producto } from "src/app/producto/producto";
import { Pedido } from "./pedido";

export class Item {
  numero: number;
  pedido: Pedido;
  producto: Producto;
  precio: number;
}

export class ItemBuilder {
  item: Item;

  constructor() {
    this.item = new Item();
  }

  withNumero(numero: number): ItemBuilder {
    this.item.numero = numero;
    return this;
  }

  withProduto(producto: Producto): ItemBuilder {
    this.item.producto = producto;
    return this;
  }

  withPrecio(precio: number): ItemBuilder {
    this.item.precio = precio;
    return this;
  }

  build(): Item {
    return this.item;
  }
}