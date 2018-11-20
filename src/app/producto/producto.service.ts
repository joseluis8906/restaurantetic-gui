import { Injectable } from '@angular/core';
import { PRODUCTOS } from './mock-productos';
import { Producto } from './producto';
import { Observable, of } from 'rxjs';

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

  getProducto(codigo:string) :Observable<Producto> {
    for(let producto of PRODUCTOS){
      if(producto.codigo === codigo){
        return of(producto);
      }
    }
    return null;
  }
}
