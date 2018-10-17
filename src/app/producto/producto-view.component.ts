import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-producto-view',
  templateUrl: './producto-view.component.html',
  styleUrls: ['./producto-view.component.scss']
})
export class ProductoViewComponent implements OnInit {

  @Input() codigo: string;
  @Input() nombre: string;
  @Input() descripcion: string;
  @Input() ingredientes: string;
  @Input() precio: number;
  ingredientesCol1: string[] = [];
  ingredientesCol2: string[] = [];

  @Output() editEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.getIngredientesCols();
  }

  onEdit(event) {
    this.editEvent.emit(true);
  }

  getIngredientesCols (): any {
    let ingredientesCols : string[] = this.ingredientes.split(',');
    if(ingredientesCols.length > 1){
      if(ingredientesCols.length % 2 === 0){
        this.ingredientesCol1 = ingredientesCols.slice(0, (ingredientesCols.length/2));
        this.ingredientesCol2 = ingredientesCols.slice(ingredientesCols.length/2);
      } else {
        this.ingredientesCol1 = ingredientesCols.slice(0, Number((ingredientesCols.length/2).toFixed()));
        this.ingredientesCol2 = ingredientesCols.slice(Number((ingredientesCols.length/2).toFixed()));
      }
    } else {
      this.ingredientesCol1 = ingredientesCols;
      this.ingredientesCol2 = [];
    }
  }
}
