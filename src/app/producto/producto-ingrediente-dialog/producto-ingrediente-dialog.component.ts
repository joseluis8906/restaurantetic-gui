import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoViewMiniComponent } from '../producto-view-mini/producto-view-mini.component';
import { Ingrediente } from '../ingrediente';

export interface DialogData{
  ingredientes: Ingrediente[];
}

@Component({
  selector: 'app-producto-ingrediente-dialog',
  templateUrl: './producto-ingrediente-dialog.component.html',
  styleUrls: ['./producto-ingrediente-dialog.component.scss']
})
export class ProductoIngredienteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProductoViewMiniComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
