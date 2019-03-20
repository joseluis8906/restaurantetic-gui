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

  productos: Producto[];

  constructor(private productoService: ProductoService, public dialog: MatDialog) {
    this.productos = new Array<Producto>();
    this.productoService.productos$.subscribe((_) => this.getProductos());
  }

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
