import { Component, HostListener, OnInit } from "@angular/core";
import { ItemBuilder } from "src/app/pedido/item";
import { Pedido } from "src/app/pedido/pedido";
import { PedidoService } from "src/app/pedido/pedido.service";
import { Producto, ProductoBuilder } from "src/app/producto/producto";
import { ProductoService } from "src/app/producto/producto.service";

@Component({
  selector: "app-pedido-productos",
  templateUrl: "./pedido-productos.component.html",
  styleUrls: ["./pedido-productos.component.scss"],
})
export class PedidoProductosComponent implements OnInit {

  pedido: Pedido;
  productos: Producto[] = [];
  screenHeight: number = 1024;

  constructor(private productoService: ProductoService, private pedidoService: PedidoService) {
    this.pedidoService.pedido$.subscribe((pedido) => {
      this.pedido = pedido;
    });
  }

  ngOnInit() {
    this.getProductos();
    this.calculateHeight();
  }

  getProductos(): void {
    const tmpProductos: Producto[] = this.productoService.getProductos();
    for (const tmpProducto of tmpProductos) {
      const tmp = new ProductoBuilder()
        .withCodigo(tmpProducto.codigo)
        .withNombre(tmpProducto.nombre)
        .withDescripcion(tmpProducto.descripcion)
        .withIngredientes(tmpProducto.ingredientes)
        .withPrecio(tmpProducto.precio)
        .withImageTitle(tmpProducto.imageTitle)
        .withImageBanner(tmpProducto.imageBanner)
        .build();

      this.productos.push(tmp);
    }
  }

  calculateHeight(): void {
    this.screenHeight = window.innerHeight - 54;
  }

  @HostListener("window:resize", ["$event"])
  onResizedDisplay(event?) {
    this.calculateHeight();
  }

  onAgregarProducto(producto: Producto): void {
    const tmpItem = new ItemBuilder()
      .withNumero(this.pedido.items.length + 1)
      .withCantidad(1)
      .withProduto(producto)
      .withPrecioUnitario(producto.precio)
      .withPrecioTotal(producto.precio * 1)
      .build();
    this.pedidoService.addItem(tmpItem);
  }
}
