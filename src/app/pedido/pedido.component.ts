import { Component, OnInit } from '@angular/core';
import { Pedido, PedidoBuilder } from 'src/app/pedido/pedido';
import { Item } from 'src/app/pedido/item';
import { PedidoService } from './pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}