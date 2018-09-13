import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TitlebarComponent } from './titlebar/titlebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductoitemComponent } from './productoitem/productoitem.component';
import { ProductotableComponent } from './productotable/productotable.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebaritemComponent } from './sidebaritem/sidebaritem.component';
import { NavbaritemComponent } from './navbaritem/navbaritem.component';
 

@NgModule({
  declarations: [
    AppComponent,
    TitlebarComponent,
    NavbarComponent,
    ProductoitemComponent,
    ProductotableComponent,
    SidebarComponent,
    SidebaritemComponent,
    NavbaritemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
