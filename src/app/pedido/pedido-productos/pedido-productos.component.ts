import { Component, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { Producto, ProductoBuilder } from 'src/app/producto/producto';
import { ProductoService } from 'src/app/producto/producto.service';
import { Item, ItemBuilder } from '../item';

@Component({
  selector: 'app-pedido-productos',
  templateUrl: './pedido-productos.component.html',
  styleUrls: ['./pedido-productos.component.scss']
})
export class PedidoProductosComponent implements OnInit {

  productos: Producto[] = [];
  screenHeight: number = 1024;

  @Output() addItem: EventEmitter<Item> = new EventEmitter();

  constructor(private productoService: ProductoService) { }

  ngOnInit() { 
    this.getProductos();
    this.calculateHeight();
  }

  getProductos() :void {
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

  calculateHeight() :void {
    this.screenHeight = window.innerHeight - 54;
  }

  @HostListener('window:resize', ['$event'])
  onResizedDisplay(event?) {
    this.calculateHeight();
  }

  onAgregarProducto(producto: Producto) :void {
    let tmpItem = new ItemBuilder()
      .withNumero(0)
      .withCantidad(1)
      .withProduto(producto)
      .withPrecioUnitario(producto.precio)
      .withPrecioTotal(producto.precio * 1)
      .build();
    this.addItem.emit(tmpItem);
  }
}
