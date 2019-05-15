import { Injectable, OnDestroy } from '@angular/core';
import { SessionStorageService } from "angular-web-storage";
import { Usuario } from '../usuario/Usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Subscription, Observable, Subject } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService implements OnDestroy {

  private subscriptions: Subscription;
  public usuario: Usuario;

  public statusSubject: Subject<SessionStatus>;
  public status$: Observable<SessionStatus>;

  constructor(private sessionStorageService: SessionStorageService, private http: HttpClient, private usuarioService: UsuarioService) {
    this.usuario = null;
    this.subscriptions = new Subscription();
    this.statusSubject = new Subject<SessionStatus>();
    this.status$ = this.statusSubject.asObservable();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public login(username: string, password: string): void {
    this.subscriptions.add(this.http.post<string>(`${environment.API_HOST}/usuarios/sign-in`, { username, password }, { headers: new HttpHeaders({'accept': "text/plain"}), responseType: "text" as "json"}).subscribe((result: string) => {
      if (result === "success") {
        this.subscriptions.add(this.usuarioService.findOne(username).subscribe((usuario: Usuario) => {
          this.usuario = usuario;
          this.sessionStorageService.set("user", JSON.stringify(usuario));
          this.statusSubject.next(SessionStatus.Logged);
        }));
      } else {
        this.usuario = null;
        this.sessionStorageService.clear();
        this.statusSubject.next(SessionStatus.Failed);
      }
    }));
  }

  public logout(): void {
    this.usuario = null;
    this.sessionStorageService.clear();
    this.statusSubject.next(SessionStatus.Logout);
  }

  public getUsuario() {
    return this.usuario;
  }
}

export enum SessionStatus {
  Logged = 1,
  Failed = 2,
  Logout = 3,
}
