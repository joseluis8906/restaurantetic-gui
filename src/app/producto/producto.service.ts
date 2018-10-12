import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { PRODUCTOS } from './mock-productos';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor() { }

  findAll () {
    return PRODUCTOS;
  }

}
