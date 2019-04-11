import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { Item } from "src/app/pedido/item";
import { PEDIDOS } from "src/app/pedido/mockPedidos";
import { Pedido, PedidoBuilder } from "src/app/pedido/pedido";

@Injectable({
  providedIn: "root",
})
export class PedidoService {

  private host: string;
  private headers: HttpHeaders;
  private pedido: Pedido;
  public pedidoSubject: Subject<Pedido>;
  public pedido$: Observable<Pedido>;

  constructor(private http: HttpClient) {
    this.host = "https://api.restaurantetic.com/api/v1";
    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
    });

    this.pedido = null;
    this.pedidoSubject = new Subject<Pedido>();
    this.pedido$ = this.pedidoSubject.asObservable();
  }

  createPedido(mesa: string): Observable<Pedido> {
    return this.getSigCodigo().pipe(mergeMap((codigo: string) => {
      const fecha = new Date();
      const newPedido: Pedido = new PedidoBuilder()
        .withFecha(new Date(Number(fecha) - (fecha.getTimezoneOffset() * 60 * 1000)).toISOString())
        .withCodigo(codigo)
        .withItems([])
        .withMesa(mesa)
        .withSubtotal(0)
        .withIva(0)
        .withTotal(0)
        .withPago(false)
        .build();

      return this.http.post<Pedido>(`${this.host}/pedidos`, newPedido, { headers: this.headers });
    }));
  }

  deletePedido(): Observable<number> {
    return this.http.delete<number>(`${this.host}/pedidos/${this.pedido.codigo}`);
  }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.host}/pedidos?pago=false`);
  }

  getPedido(codigo: string): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.host}/pedidos/${codigo}`);
  }

  changePedido(pedido: Pedido): void {
    this.pedidoSubject.next(pedido);
  }

  addItem(item: Item) { }

  deleteItem(item: Item) { }

  updateTotales() { }

  getSigCodigo(): Observable<string> {
    return this.http.get<string>(
      `${this.host}/pedidos/codigo/next`,
      { headers: new HttpHeaders({"Content-Type": "text/plain",  "Accept": "text/plain"}),
        responseType: "text" as "json" });
  }
}
