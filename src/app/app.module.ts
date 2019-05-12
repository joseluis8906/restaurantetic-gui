import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { AppRoutingModule } from "src/app/app-routing.module";
import { AppComponent } from "src/app/app.component";
import { CajaComponent } from "src/app/caja/caja.component";
import { CocinaComponent } from "src/app/cocina/cocina.component";
import { PedidoItemViewComponent } from "src/app/cocina/pedido-item-view/pedido-item-view.component";
import { PedidoViewComponent } from "src/app/cocina/pedido-view/pedido-view.component";
import { NavbarComponent } from "src/app/navbar/navbar.component";
import { NavbaritemComponent } from "src/app/navbar/navbaritem.component";
import { PedidoDetalleCajaItemComponent } from "src/app/pedido/pedido-detalle/pedido-detalle-caja-item/pedido-detalle-caja-item.component";
import { PedidoDetalleCajaComponent } from "src/app/pedido/pedido-detalle/pedido-detalle-caja/pedido-detalle-caja.component";
import { PedidoDetalleItemComponent } from "src/app/pedido/pedido-detalle/pedido-detalle-item/pedido-detalle-item.component";
import { PedidoDetalleItemsComponent } from "src/app/pedido/pedido-detalle/pedido-detalle-items/pedido-detalle-items.component";
import { PedidoDetalleMesaComponent } from "src/app/pedido/pedido-detalle/pedido-detalle-mesa/pedido-detalle-mesa.component";
import { PedidoDetalleTipoComponent } from "src/app/pedido/pedido-detalle/pedido-detalle-tipo/pedido-detalle-tipo.component";
import { PedidoDetalleTotalesComponent } from "src/app/pedido/pedido-detalle/pedido-detalle-totales/pedido-detalle-totales.component";
import { PedidoDetalleComponent } from "src/app/pedido/pedido-detalle/pedido-detalle.component";
import { PedidoProductosComponent } from "src/app/pedido/pedido-productos/pedido-productos.component";
import { PedidoComponent } from "src/app/pedido/pedido.component";
import { ProductoIngredienteDialogComponent } from "src/app/producto/producto-ingrediente-dialog/producto-ingrediente-dialog.component";
import { ProductoItemComponent } from "src/app/producto/producto-item/producto-item.component";
import { ProductoNewEditDialogComponent } from "src/app/producto/producto-new-edit-dialog/producto-new-edit-dialog.component";
import { ProductoViewMiniComponent } from "src/app/producto/producto-view-mini/producto-view-mini.component";
import { ProductoViewComponent } from "src/app/producto/producto-view/producto-view.component";
import { ProductotableComponent } from "src/app/producto/productotable.component";
import { SidebarComponent } from "src/app/sidebar/sidebar.component";
import { SidebaritemComponent } from "src/app/sidebar/sidebaritem/sidebaritem.component";
import { TitlebarComponent } from "src/app/titlebar/titlebar.component";
import { UsuarioComponent } from "src/app/usuario/usuario.component";
import { LoginComponent } from './login/login.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [
    AppComponent,
    CajaComponent,
    CocinaComponent,
    NavbarComponent,
    NavbaritemComponent,
    PedidoComponent,
    PedidoDetalleCajaComponent,
    PedidoDetalleCajaItemComponent,
    PedidoDetalleComponent,
    PedidoDetalleItemComponent,
    PedidoDetalleItemsComponent,
    PedidoDetalleMesaComponent,
    PedidoDetalleTipoComponent,
    PedidoDetalleTotalesComponent,
    PedidoItemViewComponent,
    PedidoProductosComponent,
    PedidoViewComponent,
    ProductoIngredienteDialogComponent,
    ProductoItemComponent,
    ProductoNewEditDialogComponent,
    ProductotableComponent,
    ProductoViewComponent,
    ProductoViewMiniComponent,
    SidebarComponent,
    SidebaritemComponent,
    TitlebarComponent,
    UsuarioComponent,
    LoginComponent,
  ],
  imports: [
    AngularFontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserModule.withServerTransition({appId: "my-app"}),
    CurrencyMaskModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    PerfectScrollbarModule,
    NgxChartsModule,
  ],
  entryComponents: [
    ProductoIngredienteDialogComponent,
    ProductoNewEditDialogComponent,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true }},
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
