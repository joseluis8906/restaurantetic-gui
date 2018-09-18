import { Component, OnInit } from '@angular/core';
import { SideBarItem } from './SideBarItem';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  items: SideBarItem[] = [
    {active: true, href: '/', icon: 'fa fa-home'},
    {active: false, href: '/productos', icon: 'fa fa-search'}
  ];
  
  constructor() { }

  ngOnInit() {
  }

  changeItem (item: SideBarItem) {
    for(let i=0; i<this.items.length; i++){
      if(this.items[i].href === item.href){
        this.items[i].active = true;
      } else {
        this.items[i].active = false;
      }
    }
  }

}

