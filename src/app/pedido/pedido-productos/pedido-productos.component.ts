import { Component, HostListener, OnInit, OnDestroy } from "@angular/core";
import { ItemBuilder } from "src/app/pedido/item";
import { Pedido } from "src/app/pedido/pedido";
import { PedidoService } from "src/app/pedido/pedido.service";
import { Producto, ProductoBuilder } from "src/app/producto/producto";
import { ProductoService } from "src/app/producto/producto.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-pedido-productos",
  templateUrl: "./pedido-productos.component.html",
  styleUrls: ["./pedido-productos.component.scss"],
})
export class PedidoProductosComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  pedido: Pedido;
  productos: Producto[] = [];
  screenHeight: number = 1024;

  constructor(private productoService: ProductoService, private pedidoService: PedidoService) {
    this.subscriptions = new Subscription();
    this.subscriptions.add(this.pedidoService.pedido$.subscribe((pedido: Pedido) => {
      this.pedido = pedido;
    }));
  }

  ngOnInit() {
    this.getProductos();
    this.calculateHeight();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getProductos(): void {
    this.subscriptions.add(this.productoService.getProductos().subscribe((productos: Producto[]) => {
      this.productos = productos;
    }));
  }

  calculateHeight(): void {
    this.screenHeight = window.innerHeight - 54;
  }

  @HostListener("window:resize", ["$event"])
  onResizedDisplay(event?) {
    this.calculateHeight();
  }
}
