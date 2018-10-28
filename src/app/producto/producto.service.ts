import { Injectable } from '@angular/core';
import { PRODUCTOS } from './mock-productos';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor() { }

  getProductos () : Producto[] {
    return PRODUCTOS;
  }

  addProducto(producto:Producto):void{
    PRODUCTOS.push(producto);
  }

}
