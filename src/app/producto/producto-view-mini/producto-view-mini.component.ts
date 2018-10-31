import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../producto';
import { MatDialog } from '@angular/material/dialog';
import { ProductoIngredienteDialogComponent } from '../producto-ingrediente-dialog/producto-ingrediente-dialog.component';
import { Ingrediente } from '../ingrediente';

@Component({
  selector: 'app-producto-view-mini',
  templateUrl: './producto-view-mini.component.html',
  styleUrls: ['./producto-view-mini.component.scss']
})
export class ProductoViewMiniComponent implements OnInit {

  @Input() producto: Producto;
  @Output() addProducto: EventEmitter<Producto> = new EventEmitter<Producto>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  onOpenDialog(): void {
    let ingredientesList: Ingrediente[] = [];
    
    for(let ingrediente of this.producto.ingredientes){      
      ingredientesList.push(new Ingrediente(ingrediente, true));      
    }

    const dialogRef = this.dialog.open(
      ProductoIngredienteDialogComponent, 
      { width: '256px',
        height: '256px',
        data: {ingredientes: ingredientesList}});

    dialogRef.afterClosed().subscribe(result => {
      if(!result)return;
      let ingredientesFinales :string[] = [];
      for(let ingrediente of result){
        if(ingrediente.activo) ingredientesFinales.push(ingrediente.nombre);
      }
      let tmpProducto = this.producto;
      tmpProducto.ingredientes = ingredientesFinales;
      this.addProducto.emit(tmpProducto);
    });
  }
}