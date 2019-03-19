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
      {
        width: "320px",
        height: "480px",
      },
    );
  }

  public getProductos(): void {
    this.productoService.getProductos().subscribe((productos: Producto[]) => {
      this.productos = productos;
    });
  }
}
