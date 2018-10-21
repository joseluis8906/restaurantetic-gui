import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.scss']
})
export class PedidoDetalleComponent implements OnInit {

  mesas: Mesa[] = [
    {numero: '01', active: false},
    {numero: '02', active: false},
    {numero: '03', active: false},
    {numero: '04', active: false},
    {numero: '05', active: false},
    {numero: '06', active: false},
    {numero: '07', active: false},
    {numero: '08', active: false},
    {numero: '09', active: false},
    {numero: '10', active: false},
    {numero: '11', active: false},
    {numero: '12', active: false},
  ];

  constructor() { }

  ngOnInit() { }

  changeMesa(mesa:Mesa) :void {
    for(let _mesa of this.mesas){
      _mesa.active = false;
      if(_mesa.numero === mesa.numero) {
        _mesa.active = true;
      }
    }
  }

}

class Mesa {
  numero: string;
  active: boolean;
}