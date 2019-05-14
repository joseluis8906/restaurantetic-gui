import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-pedido-detalle-tipo",
  templateUrl: "./pedido-detalle-tipo.component.html",
  styleUrls: ["./pedido-detalle-tipo.component.scss"],
})
export class PedidoDetalleTipoComponent implements OnInit {

  tipo: string = "mesa";

  constructor() { }

  ngOnInit() { }
}
