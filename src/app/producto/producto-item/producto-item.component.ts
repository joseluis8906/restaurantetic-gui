import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../producto';

@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.component.html',
  styleUrls: ['./producto-item.component.scss']
})
export class ProductoItemComponent implements OnInit {
  @Input() producto: Producto;
  edit: boolean = false;

  constructor() { }

  ngOnInit() { }

  changeEdit (event) :void {
    this.edit = event;
  }

}
