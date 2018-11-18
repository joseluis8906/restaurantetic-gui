import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-pedido-item-view',
  templateUrl: './pedido-item-view.component.html',
  styleUrls: ['./pedido-item-view.component.scss']
})
export class PedidoItemViewComponent implements OnInit {

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
