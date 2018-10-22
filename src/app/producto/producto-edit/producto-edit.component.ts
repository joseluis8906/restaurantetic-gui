import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Producto } from '../producto';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.scss']
})
export class ProductoEditComponent implements OnInit {

  @Input() producto: Producto;
  @Output() editEvent: EventEmitter<boolean> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {  }

  onGuardar (event) {
    console.log('guardar');
  }

  onCancelar (event) : void {
    this.editEvent.emit(false);
  }

}
