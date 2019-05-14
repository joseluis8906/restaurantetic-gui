import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from "./Usuario";
import { Subject, Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private endpoint: string;
  private headers: HttpHeaders;
  private usuario: Usuario;
  public usuarioSubject: Subject<Usuario>;
  public usuario$: Observable<Usuario>;

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.API_HOST}/usuarios`
    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
    });

    this.usuarioSubject = new Subject<Usuario>();
    this.usuario$ = this.usuarioSubject.asObservable();
  }

  getAll(): Observable<Array<Usuario>> {
    return this.http.get<Array<Usuario>>(`${this.endpoint}`);
  }

  findOne(username: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.endpoint}/${username}`);
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.endpoint}/sign-up`, usuario, {headers: this.headers});
  }

  update(usuario: Usuario): Observable<void> {
    return this.http.put<void>(`${this.endpoint}/${usuario.username}`, usuario, { headers: this.headers });
  }

  deleteOne(username: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${username}`);
  }
}
