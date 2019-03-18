import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AppComponent } from "src/app/app.component";
import { MediaService } from "src/app/media.service";
import { Producto } from "src/app/producto/producto";

@Component({
  selector: "app-producto-new-edit-dialog",
  templateUrl: "./producto-new-edit-dialog.component.html",
  styleUrls: ["./producto-new-edit-dialog.component.scss"],
})
export class ProductoNewEditDialogComponent implements OnInit {

  producto: Producto;
  ingredientesStr: string;

  constructor(
    public dialogRef: MatDialogRef<AppComponent>,
    private mediaService: MediaService) {

    this.producto = new Producto();
  }

  ngOnInit() { }

  onCancelar(): void {
    this.dialogRef.close();
  }

  onUploadPicture(file: File) {
    this.mediaService.upload(file).subscribe((imageName: string) => {
      this.producto.imageBanner = imageName;
      console.log(this.producto);
    });
  }

  onConfirmar(evt) {
    this.producto.ingredientes = this.ingredientesStr.split(",");
    this.producto.ingredientes = this.producto.ingredientes.map((elm) => elm.trim());
    console.log(this.producto);
    this.dialogRef.close();
  }
}
