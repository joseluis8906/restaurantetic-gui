import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../utils/config.service';
import { Producto } from './producto';

@Component({
  selector: 'app-productotable',
  templateUrl: './productotable.component.html',
  styleUrls: ['./productotable.component.scss']
})
export class ProductotableComponent implements OnInit {

  productos: Producto[] = [
    new Producto('HAM001', 'Hamburguesa De Res', 'Hamburgesa de carne de res', 'Carne,Tomate,Cebolla,Ketchup,Pan,Mayonesa,Queso', 14000),
    new Producto('HAM002', 'Hamburguesa De Pollo', 'Hamburgesa de pollo', 'Carne,Tomate,Cebolla,Ketchup,Pan,Mayonesa,Queso', 13000),
    new Producto('HAM002', 'Hamburguesa De Pollo', 'Hamburgesa de pollo', 'Carne,Tomate,Cebolla,Ketchup,Pan,Mayonesa,Queso', 13000),
    new Producto('HAM002', 'Hamburguesa De Pollo', 'Hamburgesa de pollo', 'Carne,Tomate,Cebolla,Ketchup,Pan,Mayonesa,Queso', 13000)
  ];

  constructor(public configService: ConfigService) { }

  ngOnInit() {
  }

}
