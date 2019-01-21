import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Ingrediente } from "src/app/producto/ingrediente";
import { AppComponent } from "src/app/app.component";

export interface DialogData {
  ingredientes: Ingrediente[];
}

@Component({
  selector: "app-producto-ingrediente-dialog",
  templateUrl: "./producto-ingrediente-dialog.component.html",
  styleUrls: ["./producto-ingrediente-dialog.component.scss"]
})
export class ProductoIngredienteDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() { }

  onCancelar(): void {
    this.dialogRef.close();
  }
}
