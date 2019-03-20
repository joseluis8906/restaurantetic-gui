import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { PRODUCTOS } from "src/app/producto/mock-productos";
import { Producto } from "src/app/producto/producto";
import { ConfigService } from "src/app/utils/config.service";

@Injectable({
  providedIn: "root",
})
export class ProductoService {

  private host: string;
  private headers: HttpHeaders;
  public productosSubject: Subject<any>;
  public productos$: Observable<any>;

  constructor(private http: HttpClient) {
    this.productosSubject = new Subject<any>();
    this.productos$ = this.productosSubject.asObservable();

    this.host = "https://api.restaurantetic.com/api/v1";
    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
    });
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.host}/productos`);
  }

  addProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.host}/productos`, producto, { headers: this.headers });
  }

  getProducto(codigo: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.host}/productos/${codigo}`);
  }

  removeProducto(codigo: string): Observable<number> {
    return this.http.delete<number>(`${this.host}/productos/${codigo}`);
  }
}
