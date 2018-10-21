import { Component, OnInit } from '@angular/core';
import { Producto, ProductoBuilder } from './producto';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-productotable',
  templateUrl: './productotable.component.html',
  styleUrls: ['./productotable.component.scss']
})
export class ProductotableComponent implements OnInit {

  productos: Producto[] = [];
  
  constructor(private productoService: ProductoService) { }

  ngOnInit() {
    this.getProductos();
  }

  getProductos (): void {
    let tmpProductos: Producto[] = this.productoService.getProductos();
    for (let tmpProducto of tmpProductos) {
      let tmp = new ProductoBuilder()
        .withCodigo(tmpProducto.codigo)
        .withNombre(tmpProducto.nombre)
        .withDescripcion(tmpProducto.descripcion)
        .withIngredientes(tmpProducto.ingredientes)
        .withPrecio(tmpProducto.precio)
        .withImageTitle(tmpProducto.imageTitle)
        .withImageBanner(tmpProducto.imageBanner)
        .build();

      this.productos.push(tmp);
    };
  }
}


