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
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductoItemComponent } from './producto/producto-item/producto-item.component';
import { ProductoViewComponent } from './producto/producto-view/producto-view.component';
import { ProductoViewMiniComponent } from './producto/producto-view-mini/producto-view-mini.component'; 
import { ProductoEditComponent } from './producto/producto-edit/producto-edit.component';
import { ProductotableComponent } from './producto/productotable.component';
import { ProductoIngredienteDialogComponent } from './producto/producto-ingrediente-dialog/producto-ingrediente-dialog.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebaritemComponent } from './sidebar/sidebaritem/sidebaritem.component';
import { NavbaritemComponent } from './navbar/navbaritem.component';
import { HomeComponent } from './home/home.component';
import { PedidoComponent } from './pedido/pedido.component';
import { PedidoProductosComponent } from './pedido/pedido-productos/pedido-productos.component';
import { PedidoDetalleComponent } from './pedido/pedido-detalle/pedido-detalle.component';
import { PedidoDetalleItemComponent } from './pedido/pedido-detalle/pedido-detalle-item/pedido-detalle-item.component';
import { PedidoDetalleTotalesComponent } from './pedido/pedido-detalle/pedido-detalle-totales/pedido-detalle-totales.component';
import { PedidoDetalleItemsComponent } from './pedido/pedido-detalle/pedido-detalle-items/pedido-detalle-items.component';
import { PedidoDetalleMesaComponent } from './pedido/pedido-detalle/pedido-detalle-mesa/pedido-detalle-mesa.component';
import { PedidoDetalleTipoComponent } from './pedido/pedido-detalle/pedido-detalle-tipo/pedido-detalle-tipo.component';
import { PedidoDetalleCajaComponent } from './pedido/pedido-detalle/pedido-detalle-caja/pedido-detalle-caja.component';
import { PedidoDetalleCajaItemComponent } from './pedido/pedido-detalle/pedido-detalle-caja-item/pedido-detalle-caja-item.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CocinaComponent } from './cocina/cocina.component';
import { CajaComponent } from './caja/caja.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    TitlebarComponent,
    NavbarComponent,
    ProductoItemComponent,
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
    PedidoDetalleComponent,
    ProductoViewMiniComponent,
    PedidoDetalleItemComponent,
    ProductoIngredienteDialogComponent,
    PedidoDetalleTotalesComponent,
    PedidoDetalleItemsComponent,
    PedidoDetalleMesaComponent,
    PedidoDetalleTipoComponent,
    PedidoDetalleCajaComponent,
    PedidoDetalleCajaItemComponent
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
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTabsModule,
    BrowserModule.withServerTransition({appId: 'my-app'})
  ],
  entryComponents: [
    ProductoIngredienteDialogComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
