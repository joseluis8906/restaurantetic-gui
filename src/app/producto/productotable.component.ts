import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Producto, ProductoBuilder } from "src/app/producto/producto";
import { ProductoNewEditDialogComponent } from "src/app/producto/producto-new-edit-dialog/producto-new-edit-dialog.component";
import { ProductoService } from "src/app/producto/producto.service";

@Component({
  selector: "app-productotable",
  templateUrl: "./productotable.component.html",
  styleUrls: ["./productotable.component.scss"],
})
export class ProductotableComponent implements OnInit {

  newProducto: Producto;
  productos: Producto[] = [];

  constructor(private productoService: ProductoService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getProductos();
  }

  public onOpenDialogAgregar(): void {
    const dialogRef = this.dialog.open(
      ProductoNewEditDialogComponent,
      { width: "256px",
        height: "256px",
        data: {producto: this.newProducto}});
  }

  public getProductos(): void {
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
}
