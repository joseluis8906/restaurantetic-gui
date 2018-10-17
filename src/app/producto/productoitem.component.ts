import { Component, OnInit, Input } from '@angular/core';
import { Producto } from './producto';

@Component({
  selector: 'app-productoitem',
  templateUrl: './productoitem.component.html',
  styleUrls: ['./productoitem.component.scss']
})
export class ProductoitemComponent implements OnInit {

  @Input() producto: Producto;
  edit: boolean = false;

  constructor() { }

  ngOnInit() { }

  changeEdit (event) :void {
    this.edit = event;
  }

}
