import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { Item } from "src/app/pedido/item";
import { Pedido, PedidoBuilder } from "src/app/pedido/pedido";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PedidoService {

  private endpoint: string;
  private headers: HttpHeaders;
  private pedido: Pedido;
  public pedidoSubject: Subject<Pedido>;
  public pedido$: Observable<Pedido>;

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.API_HOST}/pedidos`;
    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
    });

    this.pedido = null;
    this.pedidoSubject = new Subject<Pedido>();
    this.pedido$ = this.pedidoSubject.asObservable();
  }

  createPedido(mesa: string): void {
    this.getSigCodigo().subscribe((codigo: string) => {
      const fecha = new Date();
      const newPedido: Pedido = new PedidoBuilder()
        .withFecha(new Date(Number(fecha) - (fecha.getTimezoneOffset() * 60 * 1000)).toISOString())
        .withCodigo(codigo)
        .withItems([])
        .withMesa(mesa)
        .withTotal(0)
        .withPago(false)
        .build();

      this.http.post<Pedido>(`${this.endpoint}`, newPedido, { headers: this.headers }).subscribe((pedido: Pedido) => {
        this.pedido = pedido;
        this.pedidoSubject.next(this.pedido);
      });
    });
  }

  deletePedido(): void {
    this.http.delete<void>(`${this.endpoint}/${this.pedido.codigo}`).subscribe((_) => {
      this.pedido = new Pedido();
      this.pedido.items = [];
      this.pedidoSubject.next(this.pedido);
    });
  }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.endpoint}?pago=false`);
  }

  getPedido(codigo: string): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.endpoint}/${codigo}`);
  }

  changePedido(pedido: Pedido): void {
    this.pedido = pedido;
    this.pedidoSubject.next(this.pedido);
  }

  addItem(item: Item): void{
    const tmpItem: any = item;
    tmpItem.pedido = null;
    this.http.post<Pedido>(
      `${this.endpoint}/${this.pedido.codigo}/items/productos/${item.producto.codigo}`, tmpItem, { headers: this.headers })
        .subscribe((pedido: Pedido) => {
          this.pedido.items = pedido.items;
          this.pedidoSubject.next(this.pedido);
        });
  }

  deleteItem(item: Item): void {
    this.http.delete<Pedido>(`${this.endpoint}/${this.pedido.codigo}/items/${item.numero}`).subscribe((pedido: Pedido) => {
      this.pedido.items = pedido.items;
      this.pedidoSubject.next(this.pedido);
    });
  }

  updateTotales() {  }

  getSigCodigo(): Observable<string> {
    return this.http.get<string>(
      `${this.endpoint}/codigo/next`,
      { headers: new HttpHeaders({"Content-Type": "text/plain",  "Accept": "text/plain"}),
        responseType: "text" as "json" });
  }

  pagar(pedido: Pedido): Observable<void> {
    pedido.pago = true;
    return this.http.put<void>(`${this.endpoint}/${pedido.codigo}`, pedido, { headers: this.headers });
  }

  cambiarEstadoItem(item: Item): Observable<void> {
    return this.http.put<void>(`${this.endpoint}/${this.pedido.codigo}/items/${item.numero}`, item, {headers: this.headers});
  }
}
