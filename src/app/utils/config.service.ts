import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ConfigService {

  constructor() {}

  getApps(): Map<string, App> {
    const apps = new Map<string, App>();
    apps.set(Apps.Login, new App("/login", [Roles.None]));
    apps.set(Apps.Usuarios, new App("/usuarios", [Roles.Admin, Roles.Root]));
    apps.set(Apps.Productos, new App("/productos", [Roles.Admin]));
    apps.set(Apps.Pedidos, new App("/pedidos", [Roles.Cajero, Roles.Mesero]));
    apps.set(Apps.Cocina, new App("/cocina", [Roles.Cocinero]));
    apps.set(Apps.Caja, new App("/caja", [Roles.Cajero]));
    return apps;
  }
}

export class App {
  path: string;
  roles: Array<string>;

  constructor(path: string, roles: Array<string>) {
    this.path = path;
    this.roles = roles;
  }
}

export enum Roles {
  Admin = "admin",
  Cajero = "cajero",
  Mesero = "mesero",
  Cocinero = "cocinero",
  Root = "root",
  None = "none",
}

export enum Apps {
  Login = "login",
  Usuarios = "usuarios",
  Productos = "producto",
  Pedidos = "pedidos",
  Cocina = "cocina",
  Caja = "caja"
}
