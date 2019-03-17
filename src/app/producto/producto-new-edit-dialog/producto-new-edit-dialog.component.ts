import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AppComponent } from "src/app/app.component";
import { MediaService } from "src/app/media.service";
import { Producto } from "src/app/producto/producto";

export interface DialogData {
  producto: Producto;
}

@Component({
  selector: "app-producto-new-edit-dialog",
  templateUrl: "./producto-new-edit-dialog.component.html",
  styleUrls: ["./producto-new-edit-dialog.component.scss"],
})
export class ProductoNewEditDialogComponent implements OnInit {

  producto: Producto = new Producto();

  constructor(
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private mediaService: MediaService) { }

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
}
