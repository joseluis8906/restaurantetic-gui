import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductoitemComponent } from './producto/productoitem/productoitem.component';
import { ProductoViewComponent } from './producto/producto-view/producto-view.component';
import { ProductoEditComponent } from './producto/producto-edit/producto-edit.component';
import { ProductotableComponent } from './producto/productotable.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebaritemComponent } from './sidebar/sidebaritem/sidebaritem.component';
import { NavbaritemComponent } from './navbar/navbaritem.component';
import { HomeComponent } from './home/home.component';
import { PedidoComponent } from './pedido/pedido.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CocinaComponent } from './cocina/cocina.component';
import { CajaComponent } from './caja/caja.component';
import { PedidoProductosComponent } from './pedido/pedido-productos/pedido-productos.component';
import { PedidoDetalleComponent } from './pedido/pedido-detalle/pedido-detalle.component'; 

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    TitlebarComponent,
    NavbarComponent,
    ProductoitemComponent,
    ProductoViewComponent,
    ProductoEditComponent,
    ProductotableComponent,
    SidebarComponent,
    SidebaritemComponent,
    NavbaritemComponent,
    HomeComponent,
    PedidoComponent,
    UsuarioComponent,
    CocinaComponent,
    CajaComponent,
    PedidoProductosComponent,
    PedidoDetalleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    PerfectScrollbarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
