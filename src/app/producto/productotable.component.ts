import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { Producto } from "src/app/producto/producto";
import { ProductoService } from "src/app/producto/producto.service";

@Component({
  selector: "app-productotable",
  templateUrl: "./productotable.component.html",
  styleUrls: ["./productotable.component.scss"],
})
export class ProductotableComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  producto: Producto;
  productos: Producto[];
  editarAgregar: string;

  constructor(private productoService: ProductoService, public dialog: MatDialog) {
    this.editarAgregar = "none";
    this.subscriptions = new Subscription();
    this.productos = new Array<Producto>();
    this.subscriptions.add(this.productoService.productos$.subscribe((_) => {
      this.getProductos();
    }));
    this.subscriptions.add(this.productoService.editarAgregar$.subscribe((value: string) => this.editarAgregar = value));
  }

  ngOnInit() {
    this.getProductos();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public onOpenAgregar(): void {
    this.producto = new Producto();
    this.productoService.editarAgregarSubject.next("agregar");
  }

  public getProductos(): void {
    this.subscriptions.add(this.productoService.getProductos().subscribe((productos: Producto[]) => {
      this.productos = productos;
    }));
  }

  onEditar(producto: Producto): void {
    this.producto = producto;
    this.editarAgregar = "editar";
  }
}
