import { Component, OnInit, HostListener } from '@angular/core';
import { Producto } from 'src/app/producto/producto';
import { CocinaService } from '../cocina.service';
import { Pedido } from 'src/app/pedido/pedido';
import { ProductoService } from 'src/app/producto/producto.service';

@Component({
  selector: 'app-pedido-item-view',
  templateUrl: './pedido-item-view.component.html',
  styleUrls: ['./pedido-item-view.component.scss']
})
export class PedidoItemViewComponent implements OnInit {

  productos: Producto[] = [];
  sinIngredientes: string[] = [];

  screenHeight: number;

  constructor(private cocinaService: CocinaService, private productoService: ProductoService) {
    this.cocinaService.pedido$.subscribe((pedido: Pedido) => {
      this.productos = [];
      for(let item of pedido.items){
        this.productos.push(item.producto);
      }
    });
  }

  ngOnInit() {
    this.calculateHeight();
  }

  getSinIngredientes(productoIn:Producto) :void {
    this.productoService.getProducto(productoIn.codigo).subscribe((producto: Producto) => {
      this.sinIngredientes = producto.ingredientes.filter(x => !productoIn.ingredientes.includes(x));
    });
  }

  calculateHeight() :void {
    this.screenHeight = window.innerHeight - 54;
  }

  @HostListener('window:resize', ['$event'])
  onResizedDisplay(event?) {
    this.calculateHeight();
  }
}
