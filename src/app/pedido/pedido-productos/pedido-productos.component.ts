import { Component, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { Producto, ProductoBuilder } from 'src/app/producto/producto';
import { ProductoService } from 'src/app/producto/producto.service';
import { Item, ItemBuilder } from '../item';
import { PedidoService } from '../pedido.service';
import { Pedido, PedidoBuilder } from '../pedido';

@Component({
  selector: 'app-pedido-productos',
  templateUrl: './pedido-productos.component.html',
  styleUrls: ['./pedido-productos.component.scss']
})
export class PedidoProductosComponent implements OnInit {

  pedido :Pedido;
  productos: Producto[] = [];
  screenHeight: number = 1024; 

  constructor(private productoService: ProductoService, private pedidoService :PedidoService) {
    this.pedidoService.pedido$.subscribe(pedido => {
      this.pedido = pedido;
    });
  }

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
      .withNumero(this.pedido.items.length+1)
      .withCantidad(1)
      .withProduto(producto)
      .withPrecioUnitario(producto.precio)
      .withPrecioTotal(producto.precio * 1)
      .build();
    this.pedidoService.addItem(tmpItem);
  }
}
