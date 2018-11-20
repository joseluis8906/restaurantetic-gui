import { Component, OnInit, HostListener } from '@angular/core';
import { PedidoService } from 'src/app/pedido/pedido.service';
import { Pedido } from 'src/app/pedido/pedido';
import { CocinaService } from '../cocina.service';

@Component({
  selector: 'app-pedido-view',
  templateUrl: './pedido-view.component.html',
  styleUrls: ['./pedido-view.component.scss']
})
export class PedidoViewComponent implements OnInit {

  pedidos: Pedido[] = [];
  screenHeight: number;

  constructor(private pedidoService: PedidoService, private cocinaService: CocinaService) { }

  ngOnInit() {
    this.calculateHeight();
    this.cargarPedidos();
  }

  cargarPedidos() :void {
    this.pedidoService.getPedidosCaja().subscribe((pedidos: Pedido[]) => {
      for(let pedido of pedidos){
        this.pedidos.push(pedido);
      }

      console.log(this.pedidos);
    });

    this.pedidoService.getPedidosMesa().subscribe((pedidos: Pedido[]) => {
      for(let pedido of pedidos){
        this.pedidos.push(pedido);
      }

      console.log(this.pedidos);
    });
  }

  changePedido(pedido:Pedido) :void {
    this.cocinaService.changePedido(pedido);
  }

  calculateHeight() :void {
    this.screenHeight = window.innerHeight - 54;
  }

  @HostListener('window:resize', ['$event'])
  onResizedDisplay(event?) {
    this.calculateHeight();
  }
}
