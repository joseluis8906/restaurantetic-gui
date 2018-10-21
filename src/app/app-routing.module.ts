import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductotableComponent } from './producto/productotable.component';
import { PedidoComponent } from './pedido/pedido.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CajaComponent } from './caja/caja.component';
import { CocinaComponent } from './cocina/cocina.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'usuarios', component: UsuarioComponent },
  { path: 'productos', component: ProductotableComponent },
  { path: 'pedidos', component: PedidoComponent },
  { path: 'cocina', component: CocinaComponent },
  { path: 'caja', component: CajaComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
