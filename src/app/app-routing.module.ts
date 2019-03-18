import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CajaComponent } from "src/app/caja/caja.component";
import { CocinaComponent } from "src/app/cocina/cocina.component";
import { HomeComponent } from "src/app/home/home.component";
import { PedidoComponent } from "src/app/pedido/pedido.component";
import { ProductotableComponent } from "src/app/producto/productotable.component";
import { UsuarioComponent } from "src/app/usuario/usuario.component";

const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "usuarios", component: UsuarioComponent },
  { path: "productos", component: ProductotableComponent },
  { path: "pedidos", component: PedidoComponent },
  { path: "cocina", component: CocinaComponent },
  { path: "caja", component: CajaComponent },
  { path: "",   redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }, // <-- debugging purposes only
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
