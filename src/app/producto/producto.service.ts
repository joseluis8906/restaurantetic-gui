import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { PRODUCTOS } from "src/app/producto/mock-productos";
import { Producto } from "src/app/producto/producto";

@Injectable({
  providedIn: "root",
})
export class ProductoService {

  constructor() { }

  getProductos(): Producto[] {
    return PRODUCTOS;
  }

  addProducto(producto: Producto): void {
    PRODUCTOS.push(producto);
  }

  getProducto(codigo: string): Observable<Producto> {
    for (const producto of PRODUCTOS) {
      if (producto.codigo === codigo) {
        return of(producto);
      }
    }
    return null;
  }
}
