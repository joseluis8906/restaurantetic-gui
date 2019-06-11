import { Producto } from "src/app/producto/producto";

export class Item {
  numero: number;
  producto: Producto;
  sinIngredientes: string;
  precio: number;
  estado: string;
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

  withSinIngredientes(sinIngredientes: string): ItemBuilder {
    this.item.sinIngredientes = sinIngredientes;
    return this;
  }

  withPrecio(precio: number): ItemBuilder {
    this.item.precio = precio;
    return this;
  }

  withEstado(estado: string): ItemBuilder {
    this.item.estado = estado;
    return this;
  }

  build(): Item {
    return this.item;
  }
}

export enum ItemEstados {
  EnEspera = "en espera",
  EnPreparacion = "en preparacion",
  Listo = "listo",
}
