import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../producto';

@Component({
  selector: 'app-producto-view',
  templateUrl: './producto-view.component.html',
  styleUrls: ['./producto-view.component.scss']
})
export class ProductoViewComponent implements OnInit {

  @Input() producto: Producto;
  ingredientes: string[] = [];

  @Output() editEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() { 
    this.trimIngredientes();
  }

  onEdit(event) {
    this.editEvent.emit(true);
  }

  trimIngredientes () :void {
    let tmpIngredientes = this.producto.ingredientes.split(",");
    for(let ingrediente of tmpIngredientes) {
      this.ingredientes.push(ingrediente.trim());
    }
  }
}
