import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Producto } from "src/app/producto/producto";
import { ProductotableComponent } from "src/app/producto/productotable.component";

export interface DialogData {
  producto: Producto;
}

@Component({
  selector: "app-producto-new-edit-dialog",
  templateUrl: "./producto-new-edit-dialog.component.html",
  styleUrls: ["./producto-new-edit-dialog.component.scss"],
})
export class ProductoNewEditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProductotableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onCancelar(): void {
    this.dialogRef.close();
  }
}
