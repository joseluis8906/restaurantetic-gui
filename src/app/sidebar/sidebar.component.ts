import { Component, OnInit } from '@angular/core';
import { SideBarItem } from './sidebaritem/SideBarItem';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  items: SideBarItem[] = [
    {active: false, href: '/', icon: 'home'},
    {active: false, href: '/usuarios', icon: 'people'},
    {active: false, href: '/productos', icon: 'restaurant_menu'},
    {active: false, href: '/pedidos', icon: 'shopping_cart'},
    {active: false, href: '/cocina', icon: 'kitchen'},
    {active: false, href: '/caja', icon: 'monetization_on'}
  ];
  
  constructor() {}

  ngOnInit() {}

  changeActive (item: SideBarItem) {
    for(let i=0; i<this.items.length; i++){
      if(this.items[i].href === item.href){
        this.items[i].active = true;
      } else {
        this.items[i].active = false;
      }
    }
  }

}

