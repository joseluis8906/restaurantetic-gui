import { Producto } from "src/app/producto/producto";

export class Item {
  numero: number;
  cantidad: number;
  producto: Producto;
  precioUnitario: number;
  precioTotal: number;
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

  withCantidad(cantidad: number): ItemBuilder {
    this.item.cantidad = cantidad;
    return this;
  }

  withProduto(producto: Producto): ItemBuilder {
    this.item.producto = producto;
    return this;
  }

  withPrecioUnitario(precioUnitario: number): ItemBuilder {
    this.item.precioUnitario = precioUnitario;
    return this;
  }

  withPrecioTotal(precioTotal: number): ItemBuilder {
    this.item.precioTotal = precioTotal;
    return this;
  }

  build(): Item {
    return this.item;
  }
}