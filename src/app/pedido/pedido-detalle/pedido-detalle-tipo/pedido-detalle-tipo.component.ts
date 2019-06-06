import { Component, OnInit } from "@angular/core";
import { SessionService } from "src/app/utils/session.service";

@Component({
  selector: "app-pedido-detalle-tipo",
  templateUrl: "./pedido-detalle-tipo.component.html",
  styleUrls: ["./pedido-detalle-tipo.component.scss"],
})
export class PedidoDetalleTipoComponent implements OnInit {

  tipo: string = "caja";

  constructor(private sessionService: SessionService) {
    if (this.sessionService.getUsuario().roles.includes("cajero")) {
      this.tipo = "caja";
    } else {
      this.tipo = "mesa";
    }
  }

  ngOnInit() { }
}
