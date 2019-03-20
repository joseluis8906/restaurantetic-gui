import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AppComponent } from "src/app/app.component";
import { Producto } from "src/app/producto/producto";
import { ProductoService } from "src/app/producto/producto.service";
import { MediaService } from "src/app/utils/media.service";

@Component({
  selector: "app-producto-new-edit-dialog",
  templateUrl: "./producto-new-edit-dialog.component.html",
  styleUrls: ["./producto-new-edit-dialog.component.scss"],
})
export class ProductoNewEditDialogComponent implements OnInit {

  validationError: ValidateError;
  producto: Producto;

  constructor(
    public dialogRef: MatDialogRef<AppComponent>,
    private mediaService: MediaService,
    private productoService: ProductoService) {

    this.validationError = { status: false, message: "", color: "primary" };
    this.producto = new Producto();
  }

  ngOnInit() { }

  onValidate() {
    this.productoService.getProducto(this.producto.codigo).subscribe((producto_: Producto) => {
      if (producto_ !== null) {
        this.validationError = { status: true, message: "Código no disponible.", color: "warn" };
      } else {
        this.validationError = { status: false, message: "", color: "primary" };
      }
    });
  }

  onCancelar(): void {
    this.dialogRef.close();
  }

  onUploadPicture(file: File) {
    this.mediaService.upload(file).subscribe((imageName: string) => {
      this.producto.imagen = imageName;
      console.log(this.producto);
    });
  }

  onConfirmar(evt) {
    this.productoService.addProducto(this.producto).subscribe((producto_: Producto) => {
      this.productoService.productosSubject.next(producto_);
      this.dialogRef.close()
    });
  }
}

class ValidateError {
  public status: boolean;
  public message: string;
  public color: string;
}
