import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductoitemComponent } from './productos/productoitem.component';
import { ProductotableComponent } from './productos/productotable.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebaritemComponent } from './sidebar/sidebaritem.component';
import { NavbaritemComponent } from './navbar/navbaritem.component';
import { HomeComponent } from './home/home.component';
 

@NgModule({
  declarations: [
    AppComponent,
    TitlebarComponent,
    NavbarComponent,
    ProductoitemComponent,
    ProductotableComponent,
    SidebarComponent,
    SidebaritemComponent,
    NavbaritemComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
