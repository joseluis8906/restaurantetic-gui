import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { Item } from "src/app/pedido/item";
import { PEDIDOS } from "src/app/pedido/mockPedidos";
import { Pedido, PedidoBuilder } from "src/app/pedido/pedido";

@Injectable({
  providedIn: "root",
})
export class PedidoService {

  private pedido: Pedido;
  private pedidoSubject: Subject<Pedido>;
  public pedido$: Observable<Pedido>;

  constructor() {
    this.pedidoSubject = new Subject<Pedido>();
    this.pedido$ = this.pedidoSubject.asObservable();
  }

  createPedido(mesa: string): void {
    const newPedido: Pedido = new PedidoBuilder()
      .withCodigo(this.getSigCodigo())
      .withFecha(Date.now())
      .withItems([])
      .withMesa(mesa)
      .withSubtotal(0)
      .withIva(0)
      .withTotal(0)
      .withPago(false)
      .build();

    PEDIDOS.push(newPedido);
    this.pedido = PEDIDOS[PEDIDOS.length - 1];
    this.pedidoSubject.next(PEDIDOS[PEDIDOS.length - 1]);
  }

  deletePedido(): void {
    for (let i = 0; i < PEDIDOS.length; i++) {
      if (PEDIDOS[i].codigo === this.pedido.codigo) {
        PEDIDOS.splice(i, 1);
        break;
      }
    }
    this.pedido = null;
    this.pedidoSubject.next(this.pedido);
  }

  getPedidos(): Observable<Pedido[]> {
    const pedidos: Pedido[] = [];
    for (const pedido of PEDIDOS) {
      pedidos.push(pedido);
    }
    return of(pedidos);
  }

  getPedido(codigo: string): Observable<Pedido> {
    for (const pedido of PEDIDOS) {
      if (pedido.codigo === codigo && !pedido.pago) {
        return of(pedido);
      }
    }
    return null;
  }

  changePedido(codigo: string): void {
    for (const pedido_ of PEDIDOS) {
      if (pedido_.codigo === codigo && !pedido_.pago) {
        this.pedidoSubject.next(pedido_);
        this.pedido = pedido_;
        break;
      }
    }
  }
  
  changePedidoFromMesa(mesa: string): void {
    for (const pedido_ of PEDIDOS) {
      if (pedido_.mesa === mesa && !pedido_.pago) {
        this.pedidoSubject.next(pedido_);
        this.pedido = pedido_;
        return;
      }
    }
    this.createPedido(mesa);
  }

  addItem(item: Item) {
    this.pedido.items.push(item);
    this.pedidoSubject.next(this.pedido);
  }

  deleteItem(item: Item) {
    for (let i = 0; i < this.pedido.items.length; i++) {
      if (this.pedido.items[i].numero === item.numero) {
        this.pedido.items.splice(i, 1);
        break;
      }
    }
    let numero = 1;
    for (const item of this.pedido.items) {
      item.numero = numero;
      numero++;
    }
    this.pedidoSubject.next(this.pedido);
  }

  updateTotales() {
    this.pedidoSubject.next(this.pedido);
  }

  getSigCodigo(): string {
    return "PED" + (PEDIDOS.length + 1).toString().padStart(3, "0");
  }
}
