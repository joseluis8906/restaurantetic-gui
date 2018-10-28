import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../producto';

@Component({
  selector: 'app-producto-view',
  templateUrl: './producto-view.component.html',
  styleUrls: ['./producto-view.component.scss']
})
export class ProductoViewComponent implements OnInit {

  @Input() producto: Producto;

  @Output() editEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onEdit(event) {
    this.editEvent.emit(true);
  }

  onEliminar(event) {
    console.log('eliminar');
  }
}
