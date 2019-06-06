import { Usuario } from "../usuario/Usuario";
import { UsuarioService } from "../usuario/usuario.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { SessionStorageService } from "angular-web-storage";
import { Observable, Subject, Subscription } from "rxjs";
import { environment } from "src/environments/environment";

export enum SessionStatus {
  Logged = 1,
  Failed = 2,
  Logout = 3,
}

@Injectable({
  providedIn: "root"
})
export class SessionService implements OnDestroy {

  private subscriptions: Subscription;
  public usuario: Usuario;

  public statusSubject: Subject<SessionStatus>;
  public status$: Observable<SessionStatus>;

  constructor(private router: Router, private sessionStorageService: SessionStorageService, private http: HttpClient, private usuarioService: UsuarioService) {
    this.usuario = null;
    this.subscriptions = new Subscription();
    this.statusSubject = new Subject<SessionStatus>();
    this.status$ = this.statusSubject.asObservable();

    this.subscriptions.add(this.router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationEnd) {
        if (this.usuario === null && this.sessionStorageService.get("user")) {
          this.usuario = JSON.parse(this.sessionStorageService.get("user"));
          this.statusSubject.next(SessionStatus.Logged);
        }
        if (evt.urlAfterRedirects !== "/login" && this.usuario === null) {
          this.router.navigateByUrl("/login");
        }
      }
    }));
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

  public puedeSeguir?(): boolean {
    return false;
  }
}

