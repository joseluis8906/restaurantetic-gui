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

  public statusSubject: Subject<boolean>;
  public status$: Observable<boolean>;

  constructor(private sessionStorageService: SessionStorageService, private http: HttpClient, private usuarioService: UsuarioService) {
    this.subscriptions = new Subscription();
    this.statusSubject = new Subject<boolean>();
    this.status$ = this.statusSubject.asObservable();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public login(username: string, password: string): void {
    this.subscriptions.add(this.http.post<string>(`${environment.API_HOST}/usuarios/sign-in`, { username, password }, { headers: new HttpHeaders({'accept': "text/plain"}), responseType: "text" as "json"}).subscribe((result: string) => {
      if (result === "success") {
        this.subscriptions.add(this.usuarioService.findOne(username).subscribe((usuario: Usuario) => {
          this.sessionStorageService.set("user", JSON.stringify(usuario));
          this.statusSubject.next(true);
        }));
      } else {
        this.sessionStorageService.clear();
        this.statusSubject.next(false);
      }
    }));
  }
}
