import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Pedido } from "src/app/pedido/pedido";

@Injectable({
  providedIn: "root",
})
export class CocinaService {

  pedido: Pedido;
  private pedidoSubject: Subject<Pedido>;
  public pedido$: Observable<Pedido>;

  constructor() {
    this.pedidoSubject = new Subject<Pedido>();
    this.pedido$ = this.pedidoSubject.asObservable();
  }

  changePedido(pedido: Pedido): void {
    this.pedidoSubject.next(pedido);
    this.pedido = pedido;
  }
}
