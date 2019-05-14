import { Component, Input, OnInit } from "@angular/core";
import { Item } from "src/app/pedido/item";
import { PedidoService } from "src/app/pedido/pedido.service";

@Component({
  selector: "app-pedido-detalle-item",
  templateUrl: "./pedido-detalle-item.component.html",
  styleUrls: ["./pedido-detalle-item.component.scss"],
})
export class PedidoDetalleItemComponent implements OnInit {

  @Input() item: Item;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {  }

  onActualizarCantidad(): void {
    this.pedidoService.updateTotales();
  }

  deleteItem(item) {
    this.pedidoService.deleteItem(item);
  }
}
