import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-pedido-view',
  templateUrl: './pedido-view.component.html',
  styleUrls: ['./pedido-view.component.scss']
})
export class PedidoViewComponent implements OnInit {

  screenHeight: number;

  constructor() { }

  ngOnInit() {
    this.calculateHeight();
  }

  calculateHeight() :void {
    this.screenHeight = window.innerHeight - 54;
  }

  @HostListener('window:resize', ['$event'])
  onResizedDisplay(event?) {
    this.calculateHeight();
  }
}
