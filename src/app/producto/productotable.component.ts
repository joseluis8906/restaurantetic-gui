import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../utils/config.service';
import { ProductoitemComponent } from './productoitem.component';

@Component({
  selector: 'app-productotable',
  templateUrl: './productotable.component.html',
  styleUrls: ['./productotable.component.scss']
})
export class ProductotableComponent implements OnInit {

  productos: ProductoitemComponent[] = [
    new ProductoitemComponent(),
  ];

  constructor(public configService: ConfigService) { }

  ngOnInit() {
  }

}
